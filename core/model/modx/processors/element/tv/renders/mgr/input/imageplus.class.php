<?php
/**
 * @package modx
 * @subpackage processors.element.tv.renders.mgr.input
 */
 global $modx;
 $rootUrl = $modx->getOption('imageplus.url',$scriptProperties,$modx->getOption('site_url'));
 define('imgPlusCore', $modx->getOption('imageplus.corepath',$scriptProperties,$modx->getOption('core_path')));
 define('imgPlusAssets', $rootUrl.'assets/components/imageplus/');
 
 
class modTemplateVarInputRenderImagePlus extends modTemplateVarInputRender {
    public function getTemplate() {
         return imgPlusCore.'components/imageplus/tpl/input.tpl';
    }//
    
    public function process($value,array $params = array()) {
    	global $modx;
		$options = $this->getInputOptions();
		
		// Grab lexicon
		$modx->getService('lexicon','modLexicon');
		$modx->lexicon->load('imageplus:default');
		$this->modx->smarty->assign( '_lang', $modx->lexicon->fetch() );
		
		// Load Javascript files for frontend
		$modx->regClientStartupScript(imgPlusAssets.'js/imageplus.main.js');
				
		// Set options
		$targetWidth  = ($params['targetWidth']=='')? 0 : $params['targetWidth'];
		$targetHeight = ($params['targetHeight']=='')? 0 : $params['targetHeight'];
		

		$this->tv->set('name', $modx->lexicon('imageplus'));
		$this->tv->set('targetWidth',$targetWidth);
		$this->tv->set('targetHeight',$targetHeight);
		$this->tv->set('connector',imgPlusAssets.'connector.php');
		
		
		$this->tv->set('value',htmlspecialchars_decode($value));
        $this->setPlaceholder('tv',$this->tv);
    }//
}
return 'modTemplateVarInputRenderImagePlus';
