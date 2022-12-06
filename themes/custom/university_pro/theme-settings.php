<?php

/**
 * @file
 * Provides an additional config form for theme settings.
 */

use Drupal\Core\Extension\Extension;
use Drupal\Core\Extension\ExtensionDiscovery;
use Drupal\system\Controller\ThemeController;
use Drupal\Core\Theme\ThemeManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Form\FormStateInterface;
use Drupal\color\ColorSystemBrandingBlockAlter;


/**
 * Implements hook_form_system_theme_settings_alter() for settings form.
 * 
 */
function university_pro_form_system_theme_settings_alter(&$form, \Drupal\Core\Form\FormStateInterface &$form_state, $form_id = NULL) {
  /*Core theme  settings*/

  include 'animations.inc';
  
  /*Core theme  settings*/
  $form['logo']['#group'] = 'visibility';
  $form['logo']['#title'] = t('Logo Image');
  $form['logo']['#weight'] = -995;
  $form['favicon']['#group'] = 'visibility';
  $form['favicon']['#weight'] = -994;

  $form['logo']['#open'] = TRUE;
  $form['favicon']['#open'] = TRUE;
  unset($form['theme_settings']); 

  $form['visibility'] = [
    '#type' => 'vertical_tabs',
    '#title' => t('University Pro Settings'),
    '#weight' => -999,
  ];
  
  //general settings 
  $form['general'] = [
    '#type' => 'details',
    '#title' => t('General Options'),
    '#weight' => -999,
    '#group' => 'visibility',
    '#open' => FALSE,
  ];
  //loader
  $form['general']['loader-settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Page preloader Settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#open' => TRUE,
  );
  $form['general']['loader-settings']['loader'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Page Preloader'),
    '#description' => t('Check this to enable page preloader.'),
    '#default_value' => theme_get_setting('loader'),
  );
  // footer
  $form['general']['copyright'] = array(
    '#type' => 'text_format',
    '#title' => t('Copyrights'),
    '#default_value' => theme_get_setting('copyright')['value'],
    '#description'   => t("Please enter the copyright content here."),
  );
  $form['general']['personal'] = array(
    '#type' => 'fieldset',
    '#title' => t('Contact Detils'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['general']['personal']['mail'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Email Address'),
    '#default_value' => theme_get_setting('mail'),
    '#description'   => t("Please enter your email address here."),
  );
  $form['general']['personal']['phone'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Enter Phone No'),
    '#default_value' => theme_get_setting('phone'),
    '#description'   => t("Please enter your phone number here."),
  );
  // Maintanence and coming soon Section Start
  $form['general']['maintenance_mode'] = array(
    '#type' => 'details',
    '#title' => t('Maintenance Mode and Coming Soon Settings'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
  );
  $form['general']['maintenance_mode']['maintenance_mode_title'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Maintenance Mode Title'),
    '#default_value' => theme_get_setting('maintenance_mode_title'),
    '#description'   => t("Please enter the title for Maintanence Page."),
  );
  $form['general']['maintenance_mode']['maintenance_mode_description'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Maintenance Mode Description'),
    '#default_value' => theme_get_setting('maintenance_mode_description'),
    '#description'   => t("Please enter the description to show in the Maintanence Page."),
  );
  $form['general']['maintenance_mode']['mode_type'] = array(
    '#type'        => 'select',
    '#title'       => t('Mode Type'),
    '#options'     => ['1' => t('Maintenance Mode'),'2' => t('Coming Soon')],
    '#default_value' => theme_get_setting('mode_type'),
    '#description'   => t("Please select any one mode to change the content of Maintanence page. If Coming soon mode selected, while site under Maintanence, Coming Soon page content will be displayed"),
  );
  $form['general']['maintenance_mode']['bg_image'] = [
    '#type' => 'managed_file',
    '#title'    => t('Background Image'),
    '#default_value' => theme_get_setting('bg_image'),
    '#upload_location' => 'public://',
    '#description' => t('Choose background image'),
    ];
  $form['general']['maintenance_mode']['date'] = [
    '#type' => 'date',
    '#title' => t('Launch Date'),
    '#description' => t('Please enter the date of site coming to alive, This date will be displayed in Coming soon page'),
    '#default_value' => theme_get_setting('date'),
  ];
  $form['general']['maintenance_mode']['custom_message'] = [
    '#type' => 'textfield',
    '#title' => t('Date Expired custom message'),
    '#description' => t('Please enter the sub title, which will be showed in coming soon page'),
    '#default_value' => theme_get_setting('custom_message'),
  ];
  // Header Style
  $form['header'] = [
    '#type' => 'details',
    '#title' => t('Header Options'),
    '#weight' => -998,
    '#group' => 'visibility',
    '#open' => FALSE,
  ];
  $form['header']['header_variation'] = [
    '#title' => 'Header', 
    '#type' => 'select',
    '#options' => array(
      'header-1' => 'Header Style 1',
      'header-2' => 'Header Style 2',
      'header-3' => 'Header Style 3',
      'header-4' => 'Header Style 4',
    ),
    '#default_value' => theme_get_setting('header_variation'),
    '#description' => t('Please choose your prefered header style'),
  ];
  $form['header']['stricky'] = array(
    '#type'          => 'checkbox',
    '#title'         => t('Sticky menu'),
    '#default_value' => theme_get_setting('stricky'),
    '#description'   => t("Check this to make fixed heaader on scroll."),
  );
  $form['header']['button']['btn_title'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Button Title'),
    '#default_value' => theme_get_setting('btn_title'),
    '#description'   => t("Please enter title for button showned in Header."),
  );
  $form['header']['button']['btn_link'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Button Link'),
    '#default_value' => theme_get_setting('btn_link'),
    '#description'   => t("Please enter link for button showned in Header."),
  );
  // footer Section Start
  $form['social'] = array(
    '#type' => 'details',
    '#title' => t('Social Media Links'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#group' => 'visibility',
    '#weight' => -996,
  );
  $form['social']['follow_us'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Social Section title'),
    '#default_value' => theme_get_setting('follow_us'),
    '#description'   => t("Please enter title of Social section."),
  );
  $form['social']['facebook'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Facebook'),
    '#default_value' => theme_get_setting('facebook'),
    '#description'   => t("Please enter your Facebook profile link"),
  );
  $form['social']['twitter'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Twitter'),
    '#default_value' => theme_get_setting('twitter'),
    '#description'   => t("Please enter your Twitter profile link"),
  ); 
  $form['social']['instagram'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Instagram'),
    '#default_value' => theme_get_setting('instagram'),
    '#description'   => t("Please enter your Instagram profile link"),
  );
  $form['social']['linkedin'] = array(
    '#type'          => 'textfield',
    '#title'         => t('Linkedin'),
    '#default_value' => theme_get_setting('linkedin'),
    '#description'   => t("Please enter your Linkedin profile link"),
  );
  // custum css Section Start
  $form['custom_css'] = array(
    '#type' => 'details',
    '#title' => t('Custom CSS'),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#group' => 'visibility',
    '#open' => FALSE,
    '#weight' => -993,
  );
  $form['custom_css']['styles'] = array(
    '#type'          => 'textarea',
    '#title'         => t('Custom Style'),
    '#default_value' => theme_get_setting('styles'),
    '#description'   => t("Place your custom style for your site."),
  );
  
  $form['#submit'][] = 'university_pro_form_submit';
}

/**
 * Implements hook_form_submit().
 */
function university_pro_form_submit(&$form, $form_state) {
  if ($file_id = $form_state->getValue(['bg_image', '0'])) {
    $file = \Drupal::entityTypeManager()->getStorage('file')->load($file_id);
    $file->setPermanent();
    $file->save();
  }
}
