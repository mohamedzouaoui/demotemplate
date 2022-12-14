<?php

$animations = [
	'bounce'=>t('bounce'),
	'flash'=>t('flash'),
	'pulse'=>t('pulse'),
	'rubberBand'=>t('rubberBand'),
	'shakeX'=>t('shakeX'),
	'shakeY'=>t('shakeY'),
	'headShake'=>t('headShake'),
	'swing'=>t('swing'),
	'tada'=>t('tada'),
	'wobble'=>t('wobble'),
	'jello'=>t('jello'),
	'heartBeat'=>t('heartBeat'),
	'backInDown'=>t('backInDown'),
	'backInLeft'=>t('backInLeft'),
	'backInRight'=>t('backInRight'),
	'backInUp'=>t('backInUp'),
	'backOutDown'=>t('backOutDown'),
	'backOutLeft'=>t('backOutLeft'),
	'backOutRight'=>t('backOutRight'),
	'backOutUp'=>t('backOutUp'),
	'bounceIn'=>t('bounceIn'),
	'bounceInDown'=>t('bounceInDown'),
	'bounceInLeft'=>t('bounceInLeft'),
	'bounceInRight'=>t('bounceInRight'),
	'bounceInUp'=>t('bounceInUp'),
	'bounceOut'=>t('bounceOut'),
	'bounceOutDown'=>t('bounceOutDown'),
	'bounceOutLeft'=>t('bounceOutLeft'),
	'bounceOutRight'=>t('bounceOutRight'),
	'bounceOutUp'=>t('bounceOutUp'),
	'fadeIn'=>t('fadeIn'),
	'fadeInDown'=>t('fadeInDown'),
	'fadeInDownBig'=>t('fadeInDownBig'),
	'fadeInLeft'=>t('fadeInLeft'),
	'fadeInLeftBig'=>t('fadeInLeftBig'),
	'fadeInRight'=>t('fadeInRight'),
	'fadeInRightBig'=>t('fadeInRightBig'),
	'fadeInUp'=>t('fadeInUp'),
	'fadeInUpBig'=>t('fadeInUpBig'),
	'fadeInTopLeft'=>t('fadeInTopLeft'),
	'fadeInTopRight'=>t('fadeInTopRight'),
	'fadeInBottomLeft'=>t('fadeInBottomLeft'),
	'fadeInBottomRight'=>t('fadeInBottomRight'),
	'fadeOut'=>t('fadeOut'),
	'fadeOutDown'=>t('fadeOutDown'),
	'fadeOutDownBig'=>t('fadeOutDownBig'),
	'fadeOutLeft'=>t('fadeOutLeft'),
	'fadeOutLeftBig'=>t('fadeOutLeftBig'),
	'fadeOutRight'=>t('fadeOutRight'),
	'fadeOutRightBig'=>t('fadeOutRightBig'),
	'fadeOutUp'=>t('fadeOutUp'),
	'fadeOutUpBig'=>t('fadeOutUpBig'),
	'fadeOutTopLeft'=>t('fadeOutTopLeft'),
	'fadeOutTopRight'=>t('fadeOutTopRight'),
	'fadeOutBottomRight'=>t('fadeOutBottomRight'),
	'fadeOutBottomLeft'=>t('fadeOutBottomLeft'),
	'flip'=>t('flip'),
	'flipInX'=>t('flipInX'),
	'flipInY'=>t('flipInY'),
	'flipOutX'=>t('flipOutX'),
	'flipOutY'=>t('flipOutY'),
	'lightSpeedInRight'=>t('lightSpeedInRight'),
	'lightSpeedInLeft'=>t('lightSpeedInLeft'),
	'lightSpeedOutRight'=>t('lightSpeedOutRight'),
	'lightSpeedOutLeft'=>t('lightSpeedOutLeft'),
	'rotateIn'=>t('rotateIn'),
	'rotateInDownLeft'=>t('rotateInDownLeft'),
	'rotateInDownRight'=>t('rotateInDownRight'),
	'rotateInUpLeft'=>t('rotateInUpLeft'),
	'rotateInUpRight'=>t('rotateInUpRight'),
	'rotateOut'=>t('rotateOut'),
	'rotateOutDownLeft'=>t('rotateOutDownLeft'),
	'rotateOutDownRight'=>t('rotateOutDownRight'),
	'rotateOutUpLeft'=>t('rotateOutUpLeft'),
	'rotateOutUpRight'=>t('rotateOutUpRight'),
	'hinge'=>t('hinge'),
	'jackInTheBox'=>t('jackInTheBox'),
	'rollIn'=>t('rollIn'),
	'rollOut'=>t('rollOut'),
	'zoomIn'=>t('zoomIn'),
	'zoomInDown'=>t('zoomInDown'),
	'zoomInLeft'=>t('zoomInLeft'),
	'zoomInRight'=>t('zoomInRight'),
	'zoomInUp'=>t('zoomInUp'),
	'zoomOut'=>t('zoomOut'),
	'zoomOutDown'=>t('zoomOutDown'),
	'zoomOutLeft'=>t('zoomOutLeft'),
	'zoomOutRight'=>t('zoomOutRight'),
	'zoomOutUp'=>t('zoomOutUp'),
	'slideInDown'=>t('slideInDown'),
	'slideInLeft'=>t('slideInLeft'),
	'slideInRight'=>t('slideInRight'),
	'slideInUp'=>t('slideInUp'),
	'slideOutDown'=>t('slideOutDown'),
	'slideOutLeft'=>t('slideOutLeft'),
	'slideOutRight'=>t('slideOutRight'),
	'slideOutUp'=>t('slideOutUp')
];

	$form['pt_slider_settings'] = array(
	'#type' => 'details',
	'#title' => t('Slider Options'),
	'#collapsible' => TRUE,
	'#collapsed' => FALSE,
    '#group' => 'visibility',
    '#open' => TRUE,
    '#weight' => -997,
	);
	$form ['pt_slider_settings']['content_position'] = array(
	'#type'        => 'select',
	'#title'       => t('Content Position'),
	'#options' 	   => [	'pt-slider-left' => t('Left'),
					    'pt-slider-center' => t('Center'),
					    'pt-slider-right' => t('right')
					],
	'#default_value' => theme_get_setting('content_position'),
	'#description'   => t("Select the position of you slider content."),
	);
	$form['pt_slider_settings']['animations'] = array(
		'#type' => 'details',
		'#title' => t('Slider Animation Settings'),
		'#collapsible' => TRUE,
		'#collapsed' => FALSE,
        '#open' => TRUE,
	);
	$fields_animations=[
		'title'=>t('Title'),
		'tagline'=>t('TagLine'),
		'description'=>t('Description'),
	];
	foreach ($fields_animations as $key => $value) {

		$form['pt_slider_settings']['animations'][$key] = array(
			'#type' => 'details',
			'#title' => $value.' '.t('Animation Settings'),
			'#collapsible' => TRUE,
			'#collapsed' => FALSE,
            '#open' => TRUE,
		);
		$animation_key=$key.'_animation';
		$duration_key=$key.'_duration';
		$delay_key=$key.'_delay';
		$form ['pt_slider_settings']['animations'][$key][$animation_key] = array(
			'#type'        => 'select',
			'#title'       => t('Select').' '.$value.' '.t('Animation').':',
			'#options' 	   => $animations,
			'#default_value' => theme_get_setting($animation_key),
			'#description'   => t('Select the').' '.$value.' '.t('Animation effect').'.',
		);
		$form ['pt_slider_settings']['animations'][$key][$duration_key] = array(
			'#type'        => 'number',
			'#min' => 0,
			'#step'=>0.01,
			'#title'       => t('Enter').' '.$value.' '.t('Duration Time').':',
			'#default_value' => theme_get_setting($duration_key),
			'#description'   => t('You can customize the').' '.$value.' '.t('animation Duration Time here').'.',
		);
		$form ['pt_slider_settings']['animations'][$key][$delay_key] = array(
			'#type'        => 'number',
			'#min' => 0,
			'#step'=>0.01,
			'#title'       => t('Enter').' '.$value.' '.t('Delay Time').':',
			'#default_value' => theme_get_setting($delay_key),
			'#description'   => t('You can customize the').' '.$value.' '.t('animation Delay Time here').'.',
		);
	}

