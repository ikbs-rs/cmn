const entitiesInfo = 
{
	"cmn_curr": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"tp": "string",
			"country": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_currrate": {
		"attributes": {
			"id": "number",
			"site": "number",
			"curr1": "number",
			"curr2": "number",
			"begda": "string",
			"endda": "string",
			"rate": "number",
			"parity": "number"
		}
	},
	"cmn_link": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"cmb_objtp1": "number",
			"cmn_objtp2": "number",
			"valid": "number"
		}
	},
	"cmn_loc": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"long": "string",
			"tp": "number",
			"valid": "number"
		}
	},
	"cmn_locatt": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_locatts": {
		"attributes": {
			"id": "number",
			"site": "number",
			"loc": "number",
			"locatt": "number",
			"text": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_loclink": {
		"attributes": {
			"id": "number",
			"site": "number",
			"tp": "number",
			"loc1": "number",
			"loc2": "number",
			"long": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_loclinktp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_locobj": {
		"attributes": {
			"id": "number",
			"site": "number",
			"loc": "number",
			"obj": "number"
		}
	},
	"cmn_loctp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_menu": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"parentid": "number",
			"link": "string",
			"akction": "string",
			"module": "number",
			"icon": "string",
			"user": "number",
			"valid": "number"
		}
	},
	"cmn_module": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"app_id": "number",
			"valid": "number"
		}
	},
	"cmn_obj": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"tp": "number",
			"valid": "number"
		}
	},
	"cmn_objatt": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"cmn_objatttp": "number",
			"valid": "number"
		}
	},
	"cmn_objatts": {
		"attributes": {
			"id": "number",
			"site": "number",
			"obj": "number",
			"cmn_objatt": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_objatttp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_objlink": {
		"attributes": {
			"id": "number",
			"site": "number",
			"objtp1": "number",
			"obj1": "number",
			"objtp2": "number",
			"obj2": "number",
			"cmn_link": "number",
			"direction": "string",
			"code": "string",
			"text": "number",
			"um": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_objlink_arr": {
		"attributes": {
			"id": "number",
			"site": "number",
			"objtp1": "number",
			"obj1": "number",
			"objtp2": "number",
			"obj2": "number",
			"level": "number",
			"code": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_objtp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"adm_table": "number",
			"valid": "number"
		}
	},
	"cmn_par": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"tp": "number",
			"text": "string",
			"short": "string",
			"address": "string",
			"place": "number",
			"postcode": "string",
			"tel": "string",
			"activity": "string",
			"pib": "string",
			"idnum": "string",
			"pdvnum": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_paraccount": {
		"attributes": {
			"id": "number",
			"site": "number",
			"cmn_par": "number",
			"bank": "number",
			"account": "string",
			"brojpartije": "string",
			"glavni": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_paratt": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_paratts": {
		"attributes": {
			"id": "number",
			"site": "number",
			"par": "number",
			"att": "number",
			"text": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_parcontact": {
		"attributes": {
			"id": "number",
			"site": "number",
			"cmn_par": "number",
			"tp": "number",
			"person": "string",
			"long": "string",
			"tel": "string",
			"mail": "string",
			"other": "string",
			"valid": "number"
		}
	},
	"cmn_parcontacttp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"sys_code": "string",
			"valid": "number"
		}
	},
	"cmn_parlink": {
		"attributes": {
			"id": "number",
			"site": "number",
			"par1": "number",
			"par2": "number",
			"long": "string",
			"begda": "string",
			"datumod2": "string"
		}
	},
	"cmn_partp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_site": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_tax": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"country": "number",
			"valid": "number"
		}
	},
	"cmn_taxrate": {
		"attributes": {
			"id": "number",
			"cmn_id": "number",
			"site": "number",
			"tax": "number",
			"rate": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_terr": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"tp": "number",
			"postcode": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_terratt": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_terratts": {
		"attributes": {
			"id": "number",
			"site": "number",
			"loc": "number",
			"att": "number",
			"long": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_terrlink": {
		"attributes": {
			"id": "number",
			"site": "number",
			"link": "number",
			"terr1": "number",
			"terr2": "number",
			"text": "string",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_terrlinktp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_terrtp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_tgp": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"country": "number",
			"valid": "number"
		}
	},
	"cmn_tgptax": {
		"attributes": {
			"id": "number",
			"site": "number",
			"tgp": "number",
			"tax": "number",
			"begda": "string",
			"endda": "string"
		}
	},
	"cmn_um": {
		"attributes": {
			"id": "number",
			"site": "number",
			"code": "string",
			"text": "string",
			"valid": "number"
		}
	},
	"cmn_umparity": {
		"attributes": {
			"id": "number",
			"site": "number",
			"um1": "number",
			"um2": "number",
			"parity": "number",
			"begda": "string",
			"datumod2": "string"
		}
	}
}
export default {
  entitiesInfo,
}
