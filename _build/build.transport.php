<?php
$tstart = explode(' ', microtime());
$tstart = $tstart[1] + $tstart[0];
set_time_limit(0);
 
/* define package names */
define('PKG_NAME','ImagePlus');
define('PKG_NAME_LOWER','imageplus');
define('PKG_NAME_FOLDER','ImagePlus');
define('PKG_VERSION','1.0');
define('PKG_RELEASE','beta1');
 
/* define build paths */
$root = dirname(dirname(__FILE__)).'/';
$sources = array(
    'root' => $root,
    'build' => $root . '_build/',
    'data' => $root . '_build/data/',
    'resolvers' => $root . '_build/resolvers/',
    'chunks' => $root.'core/components/'.PKG_NAME_LOWER.'/chunks/',
    'lexicon' => $root . 'core/components/'.PKG_NAME_LOWER.'/lexicon/',
    'docs' => $root.'core/components/'.PKG_NAME_LOWER.'/docs/',
    'elements' => $root.'core/components/'.PKG_NAME_LOWER.'/elements/',
    'source_assets' => $root.'assets/components/'.PKG_NAME_LOWER,
    'source_core' => $root.'core/components/'.PKG_NAME_LOWER,
	'fldr' => $root.'core/components/'.PKG_NAME_FOLDER,
	'mgr' => $root.'manager/assets/components/'.PKG_NAME_FOLDER,
	'renders' => $root.'core/model/modx/processors/element/tv/renders/mgr/'
);
unset($root);

 
/* override with your own defines here (see build.config.sample.php) */
require_once $sources['build'] . 'build.config.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';
 
 
 
$modx= new modX();
$modx->initialize('mgr');
echo '<pre>'; /* used for nice formatting of log messages */
$modx->setLogLevel(modX::LOG_LEVEL_INFO);
$modx->setLogTarget('ECHO');
 
$modx->loadClass('transport.modPackageBuilder','',false, true);
$builder = new modPackageBuilder($modx);
$builder->createPackage(PKG_NAME_LOWER,PKG_VERSION,PKG_RELEASE);
$builder->registerNamespace(PKG_NAME_LOWER,false,true,'{core_path}components/'.PKG_NAME_LOWER.'/');

/** CREATE CATEGORY FOR THIS EXTRA **/
$category= $modx->newObject('modCategory');
$category->set('id',1);
$category->set('category',PKG_NAME);


/* create category vehicle */
$attr = array(
    xPDOTransport::UNIQUE_KEY => 'category',
    xPDOTransport::PRESERVE_KEYS => false,
    xPDOTransport::UPDATE_OBJECT => true,
    xPDOTransport::RELATED_OBJECTS => true,
    xPDOTransport::RELATED_OBJECT_ATTRIBUTES => array (
        'Snippets' => array(
            xPDOTransport::PRESERVE_KEYS => false,
            xPDOTransport::UPDATE_OBJECT => true,
            xPDOTransport::UNIQUE_KEY => 'name',
        ),
    ),
);
$vehicle = $builder->createVehicle($category,$attr);

/** ADD FILES **/
$modx->log(modX::LOG_LEVEL_INFO,'Adding file resolvers to category...');

// core/components/imageplus/
$vehicle->resolve('file',array(
    'source' => $sources['fldr'],
    'target' => "return MODX_CORE_PATH . 'components/';",
));

// manager/assets/components/imageplus/
$vehicle->resolve('file',array(
    'source' => $sources['mgr'],
    'target' => "return MODX_BASE_PATH . 'manager/assets/components/';",
));

// manager/assets/components/imageplus/
$vehicle->resolve('file',array(
    'source' => $sources['renders'] . 'input/imageplus.class.php',
    'target' => "return MODX_CORE_PATH . 'model/modx/processors/element/tv/renders/mgr/input/';",
));

// manager/assets/components/imageplus/
$vehicle->resolve('file',array(
    'source' => $sources['renders'] . 'inputproperties/imageplus.php',
    'target' => "return MODX_CORE_PATH . 'model/modx/processors/element/tv/renders/mgr/inputproperties/';",
));


$builder->putVehicle($vehicle);


 
/* zip up package */
$modx->log(modX::LOG_LEVEL_INFO,'Packing up transport package zip...');
$builder->pack();
 
$tend= explode(" ", microtime());
$tend= $tend[1] + $tend[0];
$totalTime= sprintf("%2.4f s",($tend - $tstart));
$modx->log(modX::LOG_LEVEL_INFO,"\n<br />Package Built.<br />\nExecution time: {$totalTime}\n");
exit ();
?>