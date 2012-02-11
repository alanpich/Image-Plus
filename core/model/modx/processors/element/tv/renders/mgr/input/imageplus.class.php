<?php
/**
 * @package modx
 * @subpackage processors.element.tv.renders.mgr.input
 */
 global $modx;
include $modx->getOption('core_path').'components/ImagePlus/imageplus.conf.php';
 
class modTemplateVarInputRenderImagePlus extends modTemplateVarInputRender {
    public function getTemplate() {
    	global $modx;
    	
        return $modx->getOption('core_path').'components/ImagePlus/templates/input.tpl';
    }//
    
    public function process($value,array $params = array()) {
    
		$options = $this->getInputOptions();
		
		$tW = $params['targetWidth'];
		if($tW==''){$tW=-1;};
		$tH = $params['targetHeight'];
		if($tH==''){$tH=-1;};
		
		$this->tv->set('targetWidth',$tW);
		$this->tv->set('targetHeight',$tH);
		
		$this->tv->set('value',htmlspecialchars_decode($value));
		$this->tv->set('assetsUrl',ImagePlusAssets);

    }//
}
return 'modTemplateVarInputRenderImagePlus';
