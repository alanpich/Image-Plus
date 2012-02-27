<?php
/**
 * @package modx
 * @subpackage processors.element.tv.renders.mgr.inputproperties
 */

 global $modx;
 define('imgPlusCore', $modx->getOption('imageplus.corepath',$scriptProperties,$modx->getOption('core_path')));
 define('imgPlusAssets', $modx->getOption('imageplus.url',$scriptProperties,$modx->getOption('assets_url')));
 $tpl = imgPlusCore.'components/imageplus/tpl/input-properties.tpl';
 
return $modx->controller->fetchTemplate($tpl);
