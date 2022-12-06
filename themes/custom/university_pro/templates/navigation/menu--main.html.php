{#
/**
 * @file
 * Theme override to display a menu.
 *
 * Available variables:
 * - menu_name: The machine name of the menu.
 * - items: A nested list of menu items. Each menu item contains:
 *   - attributes: HTML attributes for the menu item.
 *   - below: The menu item child items.
 *   - title: The menu link title.
 *   - url: The menu link url, instance of \Drupal\Core\Url
 *   - localized_options: Menu link localized options.
 *   - is_expanded: TRUE if the link has visible children within the current
 *     menu tree.
 *   - is_collapsed: TRUE if the link has children within the current menu tree
 *     that are not currently visible.
 *   - in_active_trail: TRUE if the link is in the active trail.
 */
#}
{% import _self as menus %}

{#
  We call a macro which calls itself to render the full tree.
  @see https://twig.symfony.com/doc/1.x/tags/macro.html
#}
{{ menus.menu_links(items, attributes, 0) }}

{% macro menu_links(items, attributes, menu_level) %}
  {% import _self as menus %}
  {% if items %}
    {% if menu_level == 0 %}
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="nav navbar-nav ml-auto">
    {% endif %}
    {% for item in items %}
      {%
        set liclasses = [
          menu_level == 0 ? 'nav-item',
          item.below ? 'dropdown',
          item.in_active_trail ? 'active',
          item.cactive
        ]
      %}
      {%
        set aclasses = [
          item.in_active_trail ? 'active',
          menu_level == 0 ? 'nav-link pt-nav-link',
          menu_level >= 1 ? 'dropdown-item',
          item.below ? 'dropdown-toggle',
        ]
      %}
      <li {{ item.attributes.addClass(liclasses) }}>
        {% if item.below %}
          <a {{ item.attributes.removeClass(liclasses).addClass(aclasses) }} href="#"  data-toggle="dropdown">
            {{item.title}}
          </a>
          <ul class="dropdown-menu">
          {{ menus.menu_links(item.below, attributes, menu_level + 1) }}
          </ul>
        {% else %}
          <a {{ item.attributes.removeClass(liclasses).addClass(aclasses) }} href="{{item.url}}">
            {{item.title}}
          </a>
        {% endif %}
      </li>
    {% endfor %}
    {% if menu_level == 0 %}
      </ul>
    </div>
    {% endif %}
  {% endif %}
{% endmacro %}





            

            
