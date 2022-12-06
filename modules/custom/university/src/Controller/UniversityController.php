<?php

namespace Drupal\university\Controller;

use Drupal\Core\Controller\ControllerBase;

class UniversityController extends ControllerBase
{
    public function get_chiffres_cles_old()
    {
		$title = t("Chiffres clés");
		$items = [];		
        try {
			// Load the taxonomy tree using values.
			$tree = \Drupal::entityTypeManager()->getStorage('taxonomy_term')->loadTree(
				'chiffres_cles',
				0,
				1,
				TRUE
			);
			$i=0;
			foreach ($tree as $term) {
			  $items[$i]['titre'] = $term->getName();
			  $items[$i]['chiffre'] = $term->get('field_chiffre')->value;
			  $i++;
			}

        } catch (RequestException $e) {
            // log exception;
        }
		
        return array(
            '#theme' => 'chiffres_cles',
            '#title' => $title,
            '#items' => $items
        );
    
	
	}
	
	public function get_chiffres_cles()
    {
        try {
			$title = t("Marchés publics");
			$items = [];
			$nids = \Drupal::entityQuery('node')->condition('type','marches_publics')->execute();
			$nodes =  \Drupal\node\Entity\Node::loadMultiple($nids);
						
			$i=0;
			$avis = array();
			foreach ($nodes as $node) {	
			
				
				$uri = $node->field_pdf->entity->getFileUri();
				$url = file_create_url($uri);				
				$items[$i]['titre'] = $node->title->value;
				$items[$i]['file'] = $url;
				
				$pdfs = $node->field_avis->getValue();
				if (!empty($pdfs)) {					
					for($j=0; $j<sizeof($pdfs); $j++) {	
						$file = \Drupal\file\Entity\File::load($pdfs[$j]['target_id']); 
						$path = file_create_url($file->getFileUri());
						$avis[$j]['url'] = $path;
						$avis[$j]['description'] = $pdfs[$j]['description'];
					}
				}

			  
				$items[$i]['avis'] = $avis;
				$i++;
			}
			echo "<pre>";
				print_r($items);
				die;
        } catch (RequestException $e) {
            // log exception;
        }
		
        return array(
            '#theme' => 'marches_public',
            '#title' => $title,
            '#items' => $items,
        );
    }
}