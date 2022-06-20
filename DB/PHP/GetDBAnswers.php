<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );
	//Paramètres de connexion à la BD
	$config = (object) array(
		'serveur' => 'im2ag-oracle.e.ujf-grenoble.fr',
		'port' => '1521',
		'username' => 'legoffad',
		'password' => '47671b85b1',
		'base' => 'IM2AG',
	);
	$questions_rows = array();
	//Connexion
	$connexion = oci_connect($config->username, $config->password, $config->serveur.':'.$config->port.'/'.$config->base);
	
	//En cas d'erreur de connexion
	if (!$connexion) {
        $e = oci_error();
        trigger_error(htmlentities($e['message'], ENT_QUOTES), E_USER_ERROR);
    }
	//En cas de connexion réussie
	else {
		
		//Requête
		$req = ("SELECT * FROM reponses");
		
		//Création d'un curseur
		$cursor = oci_parse($connexion, $req);
		
		//En cas d'erreur d'exécution
		if (!oci_execute($cursor)) {
			print_r (oci_error($cursor));
		}
		//En cas de bonne exécution
		else {
			
			//Affichage des résultats
			while($row = oci_fetch_array($cursor, OCI_ASSOC + OCI_RETURN_NULLS)) {
//				print_r($row);
				$rows[] = $row;
			}
			
			//Libération du curseur
			oci_free_statement($cursor);
		
		}
		
		//Fermeture de la connexion
		oci_close($connexion);

    }
	$questions = (json_encode($rows));	
	echo($questions);
?>
