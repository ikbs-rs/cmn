/*==============================================================*/
/* DBMS name:      PostgreSQL 8                                 */
/* Created on:     4/29/2023 7:31:12 PM                         */
/*==============================================================*/

/*==============================================================*/
/* Table: cmn_curr                                              */
/*==============================================================*/
create table cmn_curr (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(10)          not null,
   text                 varchar(255)         not null,
   tp                   varchar(1)           not null default '3' 
      constraint ckc_tip_zs_valut check (tp in ('1','2','3')),
   country              numeric(20)          not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_curr primary key (id)
);

comment on table cmn_curr is
'Evidencija valuta';

/*==============================================================*/
/* Index: cmn_curr_ux1                                          */
/*==============================================================*/
create unique index cmn_curr_ux1 on cmn_curr (
code
);

/*==============================================================*/
/* Table: cmn_currrate                                          */
/*==============================================================*/
create table cmn_currrate (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   curr1                numeric(20)          not null,
   curr2                numeric(20)          not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   rate                 numeric(18,5)        not null,
   parity               numeric(10)          not null,
   constraint pk_cmn_currrate primary key (id)
);

comment on table cmn_currrate is
'Kursna lista';

/*==============================================================*/
/* Index: i_fk_cmn_valutakurs1                                  */
/*==============================================================*/
create  index i_fk_cmn_valutakurs1 on cmn_currrate (
curr1
);

/*==============================================================*/
/* Table: cmn_link                                              */
/*==============================================================*/
create table cmn_link (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   cmb_objtp1           numeric(20)          not null,
   cmn_objtp2           numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_vezatip1 check (valid in (1,0)),
   constraint pk_cmn_link primary key (id)
);

comment on table cmn_link is
'Tipovi veza objekat npr O-O org1-org2, O-R-Z org-rm-zaposleni';

/*==============================================================*/
/* Index: cmn_link_ux                                           */
/*==============================================================*/
create unique index cmn_link_ux on cmn_link (
code
);

/*==============================================================*/
/* Table: cmn_loc                                               */
/*==============================================================*/
create table cmn_loc (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   long                 varchar(4000)        null,
   tp                   numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_loc1 check (valid in (1,0)),
   constraint pk_cmn_lokacija primary key (id)
);

comment on table cmn_loc is
'Lokacije,  na teritorijama';

/*==============================================================*/
/* Index: cmn_loc_ux1                                           */
/*==============================================================*/
create unique index cmn_loc_ux1 on cmn_loc (
code
);

/*==============================================================*/
/* Table: cmn_locatt                                            */
/*==============================================================*/
create table cmn_locatt (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_locatt1 check (valid in (1,0)),
   constraint pk_cmn_lokacijatiposobina primary key (id)
);

/*==============================================================*/
/* Index: cmn_locatt_ux1                                        */
/*==============================================================*/
create unique index cmn_locatt_ux1 on cmn_locatt (
code
);

/*==============================================================*/
/* Table: cmn_locatts                                           */
/*==============================================================*/
create table cmn_locatts (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   loc                  numeric(20)          not null,
   locatt               numeric(20)          not null,
   text                 varchar(500)         not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_lokacijaosobine primary key (id)
);

/*==============================================================*/
/* Table: cmn_loclink                                           */
/*==============================================================*/
create table cmn_loclink (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   tp                   numeric(20)          not null,
   loc1                 numeric(20)          not null,
   loc2                 numeric(20)          not null,
   long                 varchar(2500)        null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_lokacijaodnos primary key (id)
);

/*==============================================================*/
/* Table: cmn_loclinktp                                         */
/*==============================================================*/
create table cmn_loclinktp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_loclinktp1 check (valid in (1,0)),
   constraint pk_cmn_lokacijavezatip primary key (id)
);

/*==============================================================*/
/* Index: cmn_loclinktp_ux1                                     */
/*==============================================================*/
create unique index cmn_loclinktp_ux1 on cmn_loclinktp (
code
);

/*==============================================================*/
/* Table: cmn_locobj                                            */
/*==============================================================*/
create table cmn_locobj (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   loc                  numeric(20)          not null,
   obj                  numeric(20)          not null,
   constraint pk_cmn_locobj primary key (id)
);

comment on table cmn_locobj is
'Veza objekat - lokacija za prava pristupa';

/*==============================================================*/
/* Table: cmn_loctp                                             */
/*==============================================================*/
create table cmn_loctp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_loctp1 check (valid in (1,0)),
   constraint pk_cmn_lokacijatip primary key (id)
);

comment on table cmn_loctp is
'VENUE
-- SCENA
-- ulaz
-- -- BLOK
Nisu izdvojeni posebno kako bi moglo da se kontroliše pravo na rad sa odredenim blokovima';

/*==============================================================*/
/* Index: cmn_loctp_ux1                                         */
/*==============================================================*/
create unique index cmn_loctp_ux1 on cmn_loctp (
code
);

/*==============================================================*/
/* Table: cmn_menu                                              */
/*==============================================================*/
create table cmn_menu (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(250)         not null,
   text                 varchar(1000)        not null,
   parentid             numeric(20)          null,
   link                 varchar(1000)        null,
   akction              varchar(40)          null,
   module               numeric(20)          not null,
   icon                 varchar(250)         null,
   "user"               numeric(20)          null,
   valid                numeric(1)           not null default 1 
      constraint ckc_menu1 check (valid in (1,0)),
   constraint pk_adm_menu primary key (id)
);

comment on table cmn_menu is
'Glavni meni  modula.';

/*==============================================================*/
/* Index: cmn_menu_ux1                                          */
/*==============================================================*/
create unique index cmn_menu_ux1 on cmn_menu (
code
);

/*==============================================================*/
/* Table: cmn_module                                            */
/*==============================================================*/
create table cmn_module (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(10)          not null,
   text                 varchar(60)          not null,
   app_id               numeric(20)          null,
   valid                numeric(1)           not null default 1 
      constraint ckc_modul check (valid in (1,0)),
   constraint pk_adm_modul primary key (id)
);

comment on table cmn_module is
'Evidencija internih programskih modula';

/*==============================================================*/
/* Index: cmn_module_ux1                                        */
/*==============================================================*/
create unique index cmn_module_ux1 on cmn_module (
code
);

/*==============================================================*/
/* Table: cmn_obj                                               */
/*==============================================================*/
create table cmn_obj (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(500)         not null,
   tp                   numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_objekat1 check (valid in (1,0)),
   constraint pk_cmn_obj primary key (id)
);

comment on table cmn_obj is
'Objekat koga nasledjuju org. jed, lokacija, radna mesta, teritorije ...';

/*==============================================================*/
/* Index: cmn_obj_ux1                                           */
/*==============================================================*/
create unique index cmn_obj_ux1 on cmn_obj (
code
);

/*==============================================================*/
/* Table: cmn_objatt                                            */
/*==============================================================*/
create table cmn_objatt (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(500)         not null,
   cmn_objatttp         numeric(20)          null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_objatt1 check (valid in (1,0)),
   constraint pk_cmn_objatt primary key (id)
);

comment on table cmn_objatt is
'Prodajna mreža
Objekat, 
Lokacija,
Organizacija';

/*==============================================================*/
/* Index: cmn_objatt_ux1                                        */
/*==============================================================*/
create unique index cmn_objatt_ux1 on cmn_objatt (
code
);

/*==============================================================*/
/* Table: cmn_objatts                                           */
/*==============================================================*/
create table cmn_objatts (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   obj                  numeric(20)          not null,
   cmn_objatt           numeric(20)          not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_objatts primary key (id)
);

/*==============================================================*/
/* Table: cmn_objatttp                                          */
/*==============================================================*/
create table cmn_objatttp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_objatttp1 check (valid in (1,0)),
   constraint pk_cmn_objatttp primary key (id)
);

/*==============================================================*/
/* Index: cmn_objatttp_ux1                                      */
/*==============================================================*/
create unique index cmn_objatttp_ux1 on cmn_objatttp (
code
);

/*==============================================================*/
/* Table: cmn_objlink                                           */
/*==============================================================*/
create table cmn_objlink (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   objtp1               numeric(20)          null,
   obj1                 numeric(20)          not null,
   objtp2               numeric(20)          null,
   obj2                 numeric(20)          not null,
   cmn_link             numeric(20)          null,
   direction            varchar(1)           not null default 'A' 
      constraint ckc_zs_objekatveza2 check (direction in ('A','B')),
   code                 varchar(2)           not null,
   text                 numeric(16,5)        not null,
   um                   numeric(20)          not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_objlink primary key (id)
);

comment on table cmn_objlink is
'Veza izmedju objekata';

/*==============================================================*/
/* Table: cmn_objlink_arr                                       */
/*==============================================================*/
create table cmn_objlink_arr (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   objtp1               numeric(20)          null,
   obj1                 numeric(20)          not null,
   objtp2               numeric(20)          null,
   obj2                 numeric(20)          not null,
   level                numeric(20)          not null,
   code                 numeric(20,2)        null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_objlink_arr primary key (id)
);

comment on table cmn_objlink_arr is
'Tabela za konverziju hijerarhijske veze u niz';

/*==============================================================*/
/* Table: cmn_objtp                                             */
/*==============================================================*/
create table cmn_objtp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   adm_table            numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_objekattip1 check (valid in (1,0)),
   constraint pk_cmn_objtp primary key (id)
);

comment on table cmn_objtp is
'Tip objekta';

/*==============================================================*/
/* Index: cmn_objtp_ux1                                         */
/*==============================================================*/
create unique index cmn_objtp_ux1 on cmn_objtp (
code
);

/*==============================================================*/
/* Table: cmn_par                                               */
/*==============================================================*/
create table cmn_par (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   tp                   numeric(20)          not null,
   text                 varchar(500)         not null,
   short                varchar(30)          null,
   address              varchar(60)          null,
   place                numeric(20)          null,
   postcode             varchar(10)          null,
   tel                  varchar(250)         null,
   activity             varchar(50)          null,
   pib                  varchar(250)         null,
   idnum                varchar(250)         null,
   pdvnum               varchar(250)         null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_par primary key (id)
);

comment on column cmn_par.activity is
'Delatnost';

comment on column cmn_par.pib is
'Da li je u PDV-u';

comment on column cmn_par.idnum is
'Maticni broj';

comment on column cmn_par.pdvnum is
'Broj PDV';

/*==============================================================*/
/* Index: cmn_par_ux1                                           */
/*==============================================================*/
create unique index cmn_par_ux1 on cmn_par (
code
);

/*==============================================================*/
/* Table: cmn_paraccount                                        */
/*==============================================================*/
create table cmn_paraccount (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   cmn_par              numeric(20)          not null,
   bank                 numeric(20)          not null,
   account              varchar(50)          not null,
   brojpartije          varchar(50)          null,
   glavni               varchar(1)           not null default 'N' 
      constraint ckc_zs_komitentiziro1 check (glavni in ('D','N')),
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_paraccount primary key (id)
);

/*==============================================================*/
/* Table: cmn_paratt                                            */
/*==============================================================*/
create table cmn_paratt (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(250)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_paratt1 check (valid in (1,0)),
   constraint pk_cmn_paratt primary key (id)
);

comment on table cmn_paratt is
'Dodatne osobine partnera, rabat, kartice ...';

/*==============================================================*/
/* Index: cmn_paratt_ux1                                        */
/*==============================================================*/
create unique index cmn_paratt_ux1 on cmn_paratt (
code
);

/*==============================================================*/
/* Table: cmn_paratts                                           */
/*==============================================================*/
create table cmn_paratts (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   par                  numeric(20)          not null,
   att                  numeric(20)          not null,
   text                 varchar(4000)        null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_paratts primary key (id)
);

/*==============================================================*/
/* Table: cmn_parcontact                                        */
/*==============================================================*/
create table cmn_parcontact (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   cmn_par              numeric(20)          not null,
   tp                   numeric(20)          not null,
   person               varchar(500)         not null,
   long                 varchar(500)         null,
   tel                  varchar(500)         null,
   mail                 varchar(250)         null,
   other                varchar(500)         null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_parcontact check (valid in (1,0)),
   constraint pk_cmn_parcontact primary key (id)
);

/*==============================================================*/
/* Table: cmn_parcontacttp                                      */
/*==============================================================*/
create table cmn_parcontacttp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   sys_code             varchar(100)         not null default 'X',
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_parcontacttp1 check (valid in (1,0)),
   constraint pk_cmn_parcontacttp primary key (id)
);

comment on table cmn_parcontacttp is
'Tip kootakt lica, vlasnik, direktor, sekretarica ...';

comment on column cmn_parcontacttp.sys_code is
'Sifra za izdvajnje posebnih korisika';

/*==============================================================*/
/* Index: cmn_parcontacttp_ux1                                  */
/*==============================================================*/
create unique index cmn_parcontacttp_ux1 on cmn_parcontacttp (
code
);

/*==============================================================*/
/* Table: cmn_parlink                                           */
/*==============================================================*/
create table cmn_parlink (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   par1                 numeric(20)          not null,
   par2                 numeric(20)          not null,
   long                 varchar(2500)        null,
   begda                varchar(10)          null,
   datumod2             varchar(10)          null,
   constraint pk_cmn_parlink primary key (id)
);

comment on table cmn_parlink is
'Odnos izmedju partnera povezanih lica, predstavništva';

/*==============================================================*/
/* Table: cmn_partp                                             */
/*==============================================================*/
create table cmn_partp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(250)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_partp1 check (valid in (1,0)),
   constraint pk_cmn_partp primary key (id)
);

/*==============================================================*/
/* Index: cmn_partp_ux1                                         */
/*==============================================================*/
create unique index cmn_partp_ux1 on cmn_partp (
code
);

/*==============================================================*/
/* Table: cmn_site                                              */
/*==============================================================*/
create table cmn_site (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_sajt1 check (valid in (1,0)),
   constraint pk_cmn_site primary key (id)
);

/*==============================================================*/
/* Index: cmn_site_ux1                                          */
/*==============================================================*/
create unique index cmn_site_ux1 on cmn_site (
code
);

/*==============================================================*/
/* Table: cmn_tax                                               */
/*==============================================================*/
create table cmn_tax (
   id                   numeric(20)          not null,
   site                 numeric(20)          not null,
   code                 varchar(20)          not null,
   text                 varchar(60)          not null,
   country              numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_tax1 check (valid in (1,0)),
   constraint pk_cmn_tax primary key (id)
);

/*==============================================================*/
/* Index: cmn_tax_ux1                                           */
/*==============================================================*/
create unique index cmn_tax_ux1 on cmn_tax (
code
);

/*==============================================================*/
/* Table: cmn_taxrate                                           */
/*==============================================================*/
create table cmn_taxrate (
   id                   numeric(20)          not null,
   cmn_id               numeric(20)          null,
   site                 numeric(20)          not null,
   tax                  numeric(20)          not null,
   rate                 numeric(20,5)        not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_taxrate primary key (id)
);

/*==============================================================*/
/* Table: cmn_terr                                              */
/*==============================================================*/
create table cmn_terr (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(250)         not null,
   tp                   numeric(20)          not null,
   postcode             varchar(50)          null,
   begda                varchar(10)          not null,
   endda                varchar(10)          null,
   constraint pk_cmn_terr primary key (id)
);

comment on table cmn_terr is
'Teritorijalne celine drzava, grad, opstina, mz, oblast ...';

/*==============================================================*/
/* Index: cmn_terr_ux1                                          */
/*==============================================================*/
create unique index cmn_terr_ux1 on cmn_terr (
code
);

/*==============================================================*/
/* Table: cmn_terratt                                           */
/*==============================================================*/
create table cmn_terratt (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(500)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_terratt1 check (valid in (1,0)),
   constraint pk_cmn_terratt primary key (id)
);

/*==============================================================*/
/* Index: cmn_terratt_ux1                                       */
/*==============================================================*/
create unique index cmn_terratt_ux1 on cmn_terratt (
code
);

/*==============================================================*/
/* Table: cmn_terratts                                          */
/*==============================================================*/
create table cmn_terratts (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   loc                  numeric(20)          not null,
   att                  numeric(20)          not null,
   long                 varchar(2500)        null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_terratts primary key (id)
);

/*==============================================================*/
/* Table: cmn_terrlink                                          */
/*==============================================================*/
create table cmn_terrlink (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   link                 numeric(20)          not null,
   terr1                numeric(20)          not null,
   terr2                numeric(20)          not null,
   text                 varchar(250)         null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_terrlink primary key (id)
);

/*==============================================================*/
/* Table: cmn_terrlinktp                                        */
/*==============================================================*/
create table cmn_terrlinktp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(150)         not null,
   text                 varchar(250)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_terrlinktp1 check (valid in (1,0)),
   constraint pk_cmn_terrlinktp primary key (id)
);

comment on table cmn_terrlinktp is
'Logicka veza izmedu teritorijalnih celina. Moguca je razlicita veza izmedu teritorijalnih celina.';

/*==============================================================*/
/* Index: cmn_terrlinktp_ux1                                    */
/*==============================================================*/
create unique index cmn_terrlinktp_ux1 on cmn_terrlinktp (
code
);

/*==============================================================*/
/* Table: cmn_terrtp                                            */
/*==============================================================*/
create table cmn_terrtp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(100)         not null,
   text                 varchar(250)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_terr1 check (valid in (1,0)),
   constraint pk_cmn_terrtp primary key (id)
);

comment on table cmn_terrtp is
'Tip teritorije drzava, grad, opstina, mz, oblast';

/*==============================================================*/
/* Index: cmn_terrtp_ux1                                        */
/*==============================================================*/
create unique index cmn_terrtp_ux1 on cmn_terrtp (
code
);

/*==============================================================*/
/* Table: cmn_tgp                                               */
/*==============================================================*/
create table cmn_tgp (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(20)          not null,
   text                 varchar(60)          not null,
   country              numeric(20)          not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_tgp1 check (valid in (1,0)),
   constraint pk_cmn_tgp primary key (id)
);

/*==============================================================*/
/* Index: cmn_tgp_ux1                                           */
/*==============================================================*/
create unique index cmn_tgp_ux1 on cmn_tgp (
code
);

/*==============================================================*/
/* Table: cmn_tgptax                                            */
/*==============================================================*/
create table cmn_tgptax (
   id                   numeric(20)          not null,
   site                 numeric(20)          not null,
   tgp                  numeric(20)          not null,
   tax                  numeric(20)          not null,
   begda                varchar(10)          not null,
   endda                varchar(10)          not null,
   constraint pk_cmn_tgptax primary key (id)
);

/*==============================================================*/
/* Table: cmn_um                                                */
/*==============================================================*/
create table cmn_um (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   code                 varchar(20)          not null,
   text                 varchar(250)         not null,
   valid                numeric(1)           not null default 1 
      constraint ckc_cmn_um1 check (valid in (1,0)),
   constraint pk_cmn_um primary key (id)
);

comment on table cmn_um is
'Jedinica mere';

/*==============================================================*/
/* Index: cmn_um_ux1                                            */
/*==============================================================*/
create unique index cmn_um_ux1 on cmn_um (
code
);

/*==============================================================*/
/* Table: cmn_umparity                                          */
/*==============================================================*/
create table cmn_umparity (
   id                   numeric(20)          not null,
   site                 numeric(20)          null,
   um1                  numeric(20)          not null,
   um2                  numeric(20)          not null,
   parity               numeric(15,2)        not null,
   begda                varchar(10)          null,
   datumod2             varchar(10)          null,
   constraint pk_cmn_umparity primary key (id)
);

alter table cmn_curr
   add constraint fk_cmn_curr1 foreign key (id)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_currrate
   add constraint fk_cmn_currrate1 foreign key (curr1)
      references cmn_curr (id)
      on update restrict;

alter table cmn_currrate
   add constraint fk_cmn_currrate2 foreign key (curr2)
      references cmn_curr (id)
      on delete restrict on update restrict;

alter table cmn_link
   add constraint fk_cmn_link1 foreign key (cmb_objtp1)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_link
   add constraint fk_cmn_link2 foreign key (cmn_objtp2)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_link
   add constraint fk_cmn_vezatip1 foreign key (site)
      references cmn_site (id)
      on delete restrict on update restrict;

alter table cmn_loc
   add constraint fk_cmn_lokacija2 foreign key (tp)
      references cmn_loctp (id)
      on update restrict;

alter table cmn_locatts
   add constraint fk_cmn_locatts1 foreign key (locatt)
      references cmn_locatt (id)
      on update restrict;

alter table cmn_locatts
   add constraint fk_cmn_locatts2 foreign key (loc)
      references cmn_loc (id)
      on update restrict;

alter table cmn_loclink
   add constraint fk_cmn_lokacijaodnos1 foreign key (loc1)
      references cmn_loc (id)
      on delete restrict on update restrict;

alter table cmn_loclink
   add constraint fk_cmn_lokacijaodnos2 foreign key (loc2)
      references cmn_loc (id)
      on delete restrict on update restrict;

alter table cmn_loclink
   add constraint fk_cmn_lokacijaveza3 foreign key (tp)
      references cmn_loclinktp (id)
      on delete restrict on update restrict;

alter table cmn_locobj
   add constraint fk_cmn_locobj1 foreign key (loc)
      references cmn_loc (id)
      on delete restrict on update restrict;

alter table cmn_menu
   add constraint fk_menu1 foreign key (parentid)
      references cmn_menu (id)
      on update restrict;

alter table cmn_obj
   add constraint fk_cmn_obj1 foreign key (site)
      references cmn_site (id)
      on delete restrict on update restrict;

alter table cmn_obj
   add constraint fk_cmn_objekat2 foreign key (tp)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_objatt
   add constraint fk_cmn_objatt1 foreign key (cmn_objatttp)
      references cmn_objatttp (id)
      on delete restrict on update restrict;

alter table cmn_objatts
   add constraint fk_cmn_objatt2 foreign key (cmn_objatt)
      references cmn_objatt (id)
      on delete restrict on update restrict;

alter table cmn_objatts
   add constraint fk_cmn_objatts1 foreign key (obj)
      references cmn_obj (id)
      on delete restrict on update restrict;

alter table cmn_objlink
   add constraint fk_cmn_objlink1 foreign key (cmn_link)
      references cmn_link (id)
      on delete restrict on update restrict;

alter table cmn_objlink
   add constraint fk_cmn_objlink2 foreign key (obj1)
      references cmn_obj (id)
      on delete restrict on update restrict;

alter table cmn_objlink
   add constraint fk_cmn_objlink3 foreign key (obj2)
      references cmn_obj (id)
      on delete restrict on update restrict;

alter table cmn_objlink
   add constraint fk_cmn_objlink4 foreign key (objtp1)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_objlink
   add constraint fk_cmn_objlink5 foreign key (objtp2)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_objlink_arr
   add constraint fk_cmn_objlink_arr1 foreign key (site)
      references cmn_site (id)
      on delete restrict on update restrict;

alter table cmn_objlink_arr
   add constraint fk_cmn_objlink_arr2 foreign key (obj1)
      references cmn_obj (id)
      on delete restrict on update restrict;

alter table cmn_objlink_arr
   add constraint fk_cmn_objlink_arr3 foreign key (obj2)
      references cmn_obj (id)
      on delete restrict on update restrict;

alter table cmn_objlink_arr
   add constraint fk_cmn_objlink_arr4 foreign key (objtp1)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_objlink_arr
   add constraint fk_cmn_objlink_arr5 foreign key (objtp2)
      references cmn_objtp (id)
      on delete restrict on update restrict;

alter table cmn_objtp
   add constraint fk_cmn_objekattip1 foreign key (site)
      references cmn_site (id)
      on delete restrict on update restrict;

alter table cmn_par
   add constraint fk_cmn_partner1 foreign key (tp)
      references cmn_partp (id)
      on update restrict;

alter table cmn_paraccount
   add constraint fk_cmn_partnertekuci1 foreign key (cmn_par)
      references cmn_par (id)
      on update restrict;

alter table cmn_paratts
   add constraint fk_cmn_paratts1 foreign key (att)
      references cmn_paratt (id)
      on delete restrict on update restrict;

alter table cmn_paratts
   add constraint fk_cmn_partnerparametri2 foreign key (par)
      references cmn_par (id)
      on delete restrict on update restrict;

alter table cmn_parcontact
   add constraint fk_cmn_partnerkontakt1 foreign key (tp)
      references cmn_parcontacttp (id)
      on delete restrict on update restrict;

alter table cmn_parcontact
   add constraint fk_cmn_partnerkontakt2 foreign key (cmn_par)
      references cmn_par (id)
      on delete restrict on update restrict;

alter table cmn_parlink
   add constraint fk_cmn_parlink1 foreign key (par1)
      references cmn_par (id)
      on delete restrict on update restrict;

alter table cmn_parlink
   add constraint fk_cmn_parlink2 foreign key (par2)
      references cmn_par (id)
      on delete restrict on update restrict;

alter table cmn_tax
   add constraint fk_cmn_tax1 foreign key (country)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_taxrate
   add constraint fk_cmn_taxrate1 foreign key (cmn_id)
      references cmn_tax (id)
      on delete restrict on update restrict;

alter table cmn_terr
   add constraint fk_cmn_terr1 foreign key (tp)
      references cmn_terrtp (id)
      on update restrict;

alter table cmn_terratts
   add constraint fk_cmn_teratts1 foreign key (loc)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_terratts
   add constraint fk_cmn_terratts2 foreign key (att)
      references cmn_terratt (id)
      on delete restrict on update restrict;

alter table cmn_terrlink
   add constraint fk_cmn_terrlink1 foreign key (terr1)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_terrlink
   add constraint fk_cmn_terrlink2 foreign key (terr2)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_terrlink
   add constraint fk_cmn_terrlink3 foreign key (link)
      references cmn_terrlinktp (id)
      on delete restrict on update restrict;

alter table cmn_tgp
   add constraint fk_cmn_tgp1 foreign key (country)
      references cmn_terr (id)
      on delete restrict on update restrict;

alter table cmn_tgptax
   add constraint fk_cmn_tgptax1 foreign key (tgp)
      references cmn_tgp (id)
      on delete restrict on update restrict;

alter table cmn_tgptax
   add constraint fk_cmn_tgptax2 foreign key (tax)
      references cmn_tax (id)
      on delete restrict on update restrict;

alter table cmn_umparity
   add constraint fk_cmn_jmodnos1 foreign key (um1)
      references cmn_um (id)
      on delete restrict on update restrict;

alter table cmn_umparity
   add constraint fk_cmn_jmodnos2 foreign key (um2)
      references cmn_um (id)
      on delete restrict on update restrict;
     
     
SELECT
  '"'||table_name||'": { "attributes":'||
  json_object_agg(column_name, 
    CASE data_type
      WHEN 'numeric' THEN 'number'
      ELSE 'string'
    END
  )||'},' AS attributes
FROM
  (
select *
 FROM
  information_schema.columns
 WHERE
  table_schema LIKE 'iis'
 order by
  table_name, ordinal_position  
  ) a
WHERE
  table_schema LIKE 'iis'
  and table_name like 'cmn_%'
GROUP BY
  table_name;     

