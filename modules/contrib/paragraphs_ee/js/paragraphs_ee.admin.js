(function ($, Drupal, drupalSettings) {

  'use strict';

  /**
   * Ensure namespace for paragraphs features exists.
   */
  if (typeof drupalSettings.paragraphs_features === 'undefined') {
    drupalSettings.paragraphs_features = {};
  }

  /**
   * Init paragraphs widget with custom "add in between" functionality.
   *
   * @param {string} paragraphsWidgetId
   *   Paragraphs Widget ID.
   *
   * @see paragraphs_features/Drupal.paragraphs_features.add_in_between.initParagraphsWidget
   */
  Drupal.paragraphs_features.add_in_between.initParagraphsWidget = function (paragraphsWidgetId) {
    var $elements = $('#' + paragraphsWidgetId).find('[data-paragraphs-ee]').first()
            .once('paragraphs-features-add-in-between-init');

    $elements.each(function (index, element) {
      var $element = $(element);
      var $table = $(element).find('.field-multiple-table').first();
      var $addModalBlock = $element.find('[data-paragraphs-ee-dialog-wrapper]').last().parent()
      var $addModalButton = $addModalBlock.find('.paragraph-type-add-modal-button');

      // Ensure that paragraph list uses modal dialog.
      if ($addModalButton.length === 0) {
        return;
      }
      // A new button for adding at the end of the list is used.
      $addModalBlock.hide();

      var $addModalDialog = $addModalBlock.find('.paragraphs-add-dialog');

      // Create list of buttons for quick access.
      var buttonList = [];
      var buttonsMax = $element.data('paragraphs-ee-easy-access-max');
      var buttonCount = $('li', $addModalDialog).length;

      if (buttonsMax > 0) {
        $('li[data-easy-access-weight]', $addModalDialog).each(function (index, listItem) {
          var $button = $('input,button', $(listItem));
          if ($button.hasClass('is-disabled')) {
            return;
          }
          buttonList.push({
            button: $button,
            weight: $(listItem).data('easy-access-weight')
          });
        });
        buttonList.sort(function (a, b) {
          if ((a.weight + 1000) === (b.weight + 1000)) {
            return 0;
          }
          if ((a.weight + 1000) < (b.weight + 1000)) {
            return -1;
          }
          return 1;
        });
        // Limit list of easy-access buttons.
        if ((buttonList.length >= buttonsMax) && (buttonCount === (buttonsMax + 1))) {
          buttonList = buttonList.slice(0, (buttonsMax + 1));
        }
        else if ((buttonList.length >= buttonsMax) && (buttonCount !== (buttonsMax + 1))) {
          buttonList = buttonList.slice(0, buttonsMax);
        }
      }

      var $dialogButtons = $('.paragraphs-add-dialog-list__buttons', $addModalDialog);
      if ($dialogButtons.length && (buttonCount > $('li', $dialogButtons).length)) {
        // Hide label of button group in dialog.
        $('.label__buttons', $addModalDialog).hide();
      }

      var title = Drupal.t('Show all @title_plural', {'@title_plural': $addModalDialog.data('widget-title-plural')}, {context: 'Paragraphs Editor Enhancements'});

      var rowConfig = {
        buttons: buttonList,
        buttonCount: buttonCount,
        text: Drupal.t('...', {}, {context: 'Paragraphs Editor Enhancements'}),
        title: title,
        dialog: $addModalDialog
      };
      if (buttonsMax === 0) {
        rowConfig.text = $addModalDialog.attr('aria-label');
      }
      var rowMarkup = Drupal.theme('paragraphsFeaturesAddInBetweenRowAdvanced', rowConfig);

      // Add buttons and adjust drag-drop functionality.
      var $tableBody = $table.find('> tbody');
      $tableBody.find('> tr').each(function (index, rowElement) {
        var $self = $(this);
        var rowSelector = '.paragraphs_ee__add-in-between__row:not(:first-of-type):not(:last-of-type)';
        $self.on('mouseover', function () {
          $self.prev(rowSelector).find('.paragraphs_ee__add-in-between__wrapper').css({'opacity': '1.0'});
          $self.next(rowSelector).find('.paragraphs_ee__add-in-between__wrapper').css({'opacity': '1.0'});
        });
        $self.on('mouseout', function () {
          $self.prev(rowSelector).find('.paragraphs_ee__add-in-between__wrapper').css({'opacity': '0.0'});
          $self.next(rowSelector).find('.paragraphs_ee__add-in-between__wrapper').css({'opacity': '0.0'});
        });

        $(Drupal.theme('paragraphsFeaturesAddInBetweenRowAdvanced', rowConfig)).insertBefore(rowElement);
      });

      // Add a new button for adding a new paragraph to the end of the list.
      if ($tableBody.length === 0) {
        $table.append('<tbody></tbody>');

        $tableBody = $table.find('> tbody');
      }
      $tableBody.append(rowMarkup);

      // Display buttons if no elements are added yet.
      if ($tableBody.length === 0 || $tableBody.find('> tr:not(.paragraphs_ee__add-in-between__row)').length === 0) {
        $table.find('tr.paragraphs_ee__add-in-between__row').find('.paragraphs_ee__add-in-between__wrapper').css({'opacity': '1.0'});
      }

      // Adding of a new paragraph can be disabled for some reason.
      if ($addModalButton.is(':disabled')) {
        $tableBody.find('.paragraphs-features__add-in-between__button')
                .prop('disabled', 'disabled').addClass('is-disabled');
      }

      // Rebuild button IDs.
      var button_ids = {};
      $('.paragraphs-features__add-in-between__wrapper .field-add-more-submit', $table).each(function (index, button) {
        if (!button.hasAttribute('id')) {
          return;
        }
        var button_id = $(button).attr('id');
        if (!button_ids.hasOwnProperty(button_id)) {
          // Add new unique ID to list.
          button_ids[button_id] = 1;
          return;
        }
        button_ids[button_id]++;
        // Re-assign element ID.
        $(button).attr('id', button_id + '-' + button_ids[button_id]);
      });

      // Trigger attaching of behaviours for added buttons.
      Drupal.behaviors.paragraphsFeaturesAddInBetweenRegister.attach($table);
    });
  };

  /**
   * Overridden click handler for click "Add" button between paragraphs.
   *
   * @type {Object}
   */
  Drupal.behaviors.paragraphsFeaturesAddInBetweenRegister = {
    attach: function (context) {
      $('.paragraphs-features__add-in-between__button', context)
        .once('paragraphs-features-add-in-between')
        .on('click', function (event) {
          var $button = $(this);
          var $add_more_wrapper = $button.closest('[data-paragraphs-ee]')
            .find('[data-paragraphs-ee-dialog-wrapper]').last().parent()
            .find('.paragraphs-add-dialog');
          var delta = $button.closest('tr').index() / 2;

          // Set delta before opening of dialog.
          Drupal.paragraphs_features.add_in_between.setDelta($add_more_wrapper, delta);
          // Override title (previously "Add In Between").
          Drupal.paragraphsAddModal.openDialog($add_more_wrapper, Drupal.t('Add @widget_title', {'@widget_title': $add_more_wrapper.data('widget-title')}, {context: 'Paragraphs Editor Enhancements'}), {width: '720px'});

          // Stop default execution of click event.
          event.preventDefault();
          event.stopPropagation();
        });
      $('.paragraphs_ee__add-in-between__button--off-canvas', context)
        .once('paragraphs-features-add-in-between')
        .on('click', function () {
          var $button = $(this);
          var $add_more_wrapper = $button.closest('[data-paragraphs-ee]')
            .find('[data-paragraphs-ee-dialog-wrapper]').last().parent()
            .find('.paragraphs-add-dialog');
          var delta = $button.closest('tr').index() / 2;

          // Set delta before opening of dialog.
          Drupal.paragraphs_features.add_in_between.setDelta($add_more_wrapper, delta);
        });
    }
  };

  /**
   * Advanced "add in between" row template.
   *
   * @param {object} config
   *   Configuration options for add in between row template.
   *
   * @return {string}
   *   Returns markup string for add in between row.
   *
   * @see paragraphs_features/Drupal.theme.paragraphsFeaturesAddInBetweenRow
   */
  Drupal.theme.paragraphsFeaturesAddInBetweenRowAdvanced = function (config) {
    var $row = $('<tr>')
            .addClass('paragraphs-features__add-in-between__row paragraphs_ee__add-in-between__row');
    var $cell = $('<td>')
            .attr('colspan', '100%')
            .appendTo($row);
    var $wrapper = $('<div>')
            .addClass('paragraphs-features__add-in-between__wrapper paragraphs_ee__add-in-between__wrapper clearfix')
            .appendTo($cell);

    $.each(config.buttons, function (index, button) {
      var $button = $('<button>').attr('type', 'button')
              .addClass('paragraphs_ee__add-in-between__button paragraphs_ee__paragraphs__button button--small')
              .data('source', $(button.button).attr('id'))
              .html(Drupal.t('+ @title', {'@title': $(button.button).attr('value')}, {context: 'Paragraphs Editor Enhancements'}))
              .attr('title', Drupal.t('Add @title', {'@title': $(button.button).attr('value')}, {context: 'Paragraphs Editor Enhancements'}))
              .on('click', function (event) {
                var $self = $(this);
                var $add_button = $('#' + $self.data('source'));
                var $add_more_wrapper = $self.closest('[data-paragraphs-ee]')
                        .find('[data-paragraphs-ee-dialog-wrapper]').last().parent()
                        .find('.paragraphs-add-dialog');
                var delta = $self.closest('tr').index() / 2;
                Drupal.paragraphs_features.add_in_between.setDelta($add_more_wrapper, delta);

                // Trigger click on source button.
                $add_button.trigger('mousedown');

                // Stop default execution of click event.
                event.preventDefault();
                event.stopPropagation();
              });
      if (0 === index) {
        $button.addClass('first');
      }
      if ((config.buttonCount <= config.buttons.length) && (index === config.buttons.length - 1)) {
        $button.addClass('last');
      }
      $button.appendTo($wrapper);
    });
    if (config.buttonCount > config.buttons.length) {
      if ($(config.dialog)[0].hasAttribute('data-dialog-off-canvas') && (config.dialog.data('dialog-off-canvas') === true)) {
        var $dialogButton = $('<a>')
                .addClass('paragraphs_ee__add-in-between__button paragraphs_ee__add-in-between__button--off-canvas paragraphs_ee__modal__button button--small js-show button last edit-button use-ajax')
                .html(config.text)
                .attr('title', config.title)
                .attr('href', config.dialog.data('dialog-browser-url'))
                .attr('data-progress-type', 'fullscreen')
                .attr('data-dialog-type', 'dialog')
                .attr('data-dialog-renderer', 'off_canvas')
                .attr('data-dialog-options', '{"width":485}')
                .appendTo($wrapper)
                .on('click', function () {
                  var dialog_selector = '.paragraphs-add-dialog--categorized';
                  $(dialog_selector).removeClass('active-dialog');
                  var $active_subform = $(this).closest('.js-form-item');
                  if ($active_subform.length) {
                    $active_subform.children('div').find(dialog_selector).addClass('active-dialog');
                  }
                });
        Drupal.ajax.bindAjaxLinksWithProgress($wrapper);
      }
      else {
        var $dialogButton = $('<input>')
                .addClass('paragraphs_ee__add-in-between__button paragraphs_ee__modal__button paragraphs-features__add-in-between__button button--small js-show button js-form-submit form-submit last')
                .attr('type', 'submit')
                .attr('value', config.text)
                .attr('title', config.title)
                .appendTo($wrapper);
      }

      if (config.buttons.length === 0) {
        $dialogButton.addClass('first');
      }
    }

    return $row;
  };

  /**
   * Clone of Drupal.ajax.bindAjaxLinks allowing to set progress type.
   *
   * @todo Remove if https://www.drupal.org/project/drupal/issues/2818463 has
   *   been committed.
   */
  Drupal.ajax.bindAjaxLinksWithProgress = function (element) {
    $(element).find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
      var $linkElement = $(ajaxLink);

      var elementSettings = {
        progress: {
          type: $linkElement.data('progress-type') || 'throbber'
        },
        dialogType: $linkElement.data('dialog-type'),
        dialog: $linkElement.data('dialog-options'),
        dialogRenderer: $linkElement.data('dialog-renderer'),
        base: $linkElement.attr('id'),
        element: ajaxLink
      };
      var href = $linkElement.attr('href');

      if (href) {
        elementSettings.url = href;
        elementSettings.event = 'click';
      }
      Drupal.ajax(elementSettings);
    });
  };

  /**
   * Clone of Drupal.paragraphsAddModal.openDialog allowing to override the
   * width of the popup.
   *
   * @todo Remove if https://www.drupal.org/project/paragraphs/issues/3159884 has
   *   been committed.
   */
  Drupal.paragraphsAddModal.openDialog = function (element, title, options) {
    var $element = $(element);

    // Get the delta element before moving $element to dialog element.
    var $modalDelta = $element.parent().find('.paragraph-type-add-modal-delta');

    // Deep clone with all attached events. We need to work on cloned element
    // and not directly on origin because Drupal dialog.ajax.js
    // Drupal.behaviors.dialog will do remove of origin element on dialog close.
    var default_options = {
      // Turn off autoResize from dialog.position so draggable is not disabled.
      autoResize: true,
      resizable: false,
      title: title,
      width: 'auto',
      paragraphsModalDelta: $modalDelta,
    };
    $element = $element.clone(true);
    options = $.extend({}, default_options, options);
    var dialog = Drupal.dialog($element, options);
    dialog.showModal();

    // Close the dialog after a button was clicked.
    // Use mousedown event, because we are using ajax in the modal add mode
    // which explicitly suppresses the click event.
    $element.once().find('.field-add-more-submit').on('mousedown', function () {
      dialog.close();
    });

    return dialog;
  };

  /**
   * Clone of Drupal.behaviors.paragraphsModalAdd.attach setting the popup
   * width.
   */
  Drupal.behaviors.paragraphsModalAdd.attach = function (context) {
    $('.paragraph-type-add-modal-button', context).once('add-click-handler').on('click', function (event) {
      var $button = $(this);
      Drupal.paragraphsAddModal.openDialog($button.parent().siblings('.paragraphs-add-dialog'), $button.val(), {width: '720px'});

      // Stop default execution of click event.
      event.preventDefault();
      event.stopPropagation();
    });
  };

}(jQuery, Drupal, drupalSettings));
