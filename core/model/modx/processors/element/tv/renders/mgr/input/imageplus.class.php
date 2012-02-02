<?php
/**
 * @package modx
 * @subpackage processors.element.tv.renders.mgr.input
 */
 global $modx;
include $modx->getOption('core_path').'components/ImagePlus/imageplus.conf.php';
 
class modTemplateVarInputRenderImagePlus extends modTemplateVarInputRender {
    public function getTemplate() {
        return '../core/components/ImagePlus/templates/input.tpl';
    }//
    
    public function process($value,array $params = array()) {
    
		$options = $this->getInputOptions();
		
		$this->tv->set('targetWidth',$params['targetWidth']);
		$this->tv->set('targetHeight',$params['targetHeight']);
		
		$this->tv->set('value',htmlspecialchars_decode($value));
		$this->tv->set('assetsUrl',ImagePlusAssets);

    }//
}
return 'modTemplateVarInputRenderImagePlus';
