<?php
class tvImagePlusOutputRender extends modTemplateVarOutputRender {
    public function process($value,array $params = array()) {
    	print_r($_SERVER);
        return '<div style="color:red;" class="template">'.$value.'</div>';
    }
}
return 'tvImagePlusOutputRender';
