<?php
/**
 * @package modx
 * @subpackage processors.element.tv.renders.mgr.inputproperties
 */
 
include $modx->getOption('core_path').'components/ImagePlus/imageplus.conf.php';

 
$modx->controller->setPlaceholder('base_url',$modx->getOption('base_url'));
return $modx->controller->fetchTemplate(ImagePlusCore.'templates/inputproperties.tpl');
