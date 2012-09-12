<?php
class tvImagePlusInputRender extends modTemplateVarInputRender {
    public function getTemplate() {
    	  return dirname(__FILE__).'/tpl/inputrender.tpl';
    }
    public function process($value,array $params = array()) {
    	 $this->setPlaceholder('mediasource',$this->tv->getSource('web')->get('id'));
    	 $this->setPlaceholder('tvparams',json_encode($this->getInputOptions()));
    	 
    	 $this->setPlaceholder('imgData',$this->getImageDataJSON($value,$params));    	 
    	
    }
    
    
private function getImageDataJSON($value,$params){
		$I = json_decode($value);
		$Opts = $this->getInputOptions();
		
		$data = new stdClass;
		
		// Grab MediaSource info
		$MS = $this->tv->getSource('web')->toArray();
		$data->mediasource = new stdClass;
		$data->mediasource->id = $MS['id'];
		$data->mediasource->path = $MS['properties']['basePath']['value'];
		$data->mediasource->url = $MS['properties']['baseUrl']['value'];
		unset($MS);
		
		// Grab constraint info
		$data->constraint = new stdClass;
		$data->constraint->width =  empty($params['targetWidth']) ? 0 : (int) $params['targetWidth'];
		$data->constraint->height = empty($params['targetHeight'])? 0 : (int) $params['targetHeight'];
		
		// Generate ratio value
		if( $data->constraint->width >0 && $data->constraint->height >0 ){
			// If both width/height constraints set, use that for ratio calc
			$data->constraint->ratio = $data->constraint->width/$data->constraint->height;
		} else 
		if( isset($I->source->width) && isset($I->source->height) ){
			// Use source image size for ratio
			$data->constraint->ratio = $I->source->width / $I->source->height;
		} else {
			// Fail safe (and square)
			$data->constraint->ratio = false;
		};
		
		// Grab source image info (if it exists yet)
		if( isset($I->source) ){
			$data->source = new stdClass;
			$data->source->height = $I->source->height;
			$data->source->width = $I->source->width;
			$data->source->path = $I->source->path;
			$data->source->filename = $I->source->filename;
			$data->source->size = $I->source->size;
		} else {
			$data->source = false;
		};
		return json_encode($data);
    }//

}
return 'tvImagePlusInputRender';
