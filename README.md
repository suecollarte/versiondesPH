# ProximaHora

## Tabla de Contenido
- [Descripcion](Descripcion)
- [Requisitos](Requisitos)
- [Directorio](Directorio)
***  
## Descripcion
**Proxima Hora** es una plataforma web en la cual se inscriben especialistas para que otros usuarios agenden horas por sus servicios.
 
***
## Requisitos
### Generales
- HTML
- Mysql
- Python 3
- Django 3
- Javascript
  - jquery
  - jquery-ui
- bootstrap@5.3.3
- font-awesome
- Sistema Operativo ubuntu 22.04
### Python
- asgiref==3.7.2
- distlib==0.3.8
- Django==5.0.3
- filelock==3.13.1
- humanize==4.9.0
- mysql-connector==2.2.9
- mysql-connector-python==8.3.0
- mysqlclient==2.2.4
- numpy==1.26.4
- pandas==2.2.1
- ph==1.1.5
- pillow==10.2.0
- platformdirs==4.2.0
- python-dateutil==2.9.0.post0
- pytz==2024.1
- six==1.16.0
- sqlparse==0.4.4
- tzdata==2024.1
- virtualenv==20.25.1
***

## Directorio
La estructura de directorio es la siguiente

📜.git<br />
📦especialistas<br />
 ┣ 📂migrations<br />
 ┣ 📂templates<br />
 ┃ ┣ 📜especialistas_ajax_list.html<br />
 ┃ ┣ 📜especialistas_detalle.html<br />
 ┃ ┗ 📜especialistas_list.html<br />
 ┣ 📜admin.py<br />
 ┣ 📜apps.py<br />
 ┣ 📜models.py<br />
 ┣ 📜tests.py<br />
 ┣ 📜urls.py<br />
 ┣ 📜views.py<br />
 ┗ 📜__init__.py<br />
 📦imagenes<br />
 ┣ 📂documentos<br />
 ┃ ┣ 📂rut_especialista1<br />
 ┃ ┃ ┣ 📂rut_usuario1<br />
 ┃ ┃ ┣ 📂rut_usuario2<br />
 ┃ ┃ ┣ 📂rut_usuario3<br />
 ┃ ┃ ┣ 📂rut_usuario4<br />
 ┃ ┃ ┗ 📂rut_usuario.....<br />
 ┃ ┣ 📂rut_especialista2<br />
 ┃ ┃ ┣ 📂rut_usuario1<br />
 ┃ ┃ ┣ 📂rut_usuario2<br />
 ┃ ┃ ┣ 📂rut_usuario3<br />
 ┃ ┃ ┣ 📂rut_usuario4<br />
 ┃ ┃ ┗ 📂rut_usuario.....<br />
 ┃ ┣ 📂rut_especialista3<br />
 ┃ ┃ ┣ 📂rut_usuario1<br />
 ┃ ┃ ┣ 📂rut_usuario2<br />
 ┃ ┃ ┣ 📂rut_usuario3<br />
 ┃ ┃ ┣ 📂rut_usuario4<br />
 ┃ ┃ ┗ 📂rut_usuario.....<br />
 ┃ ┣ 📂rut_especialista4<br />
 ┃ ┃ ┣ 📂rut_usuario1<br />
 ┃ ┃ ┣ 📂rut_usuario2<br />
 ┃ ┃ ┣ 📂rut_usuario3<br />
 ┃ ┃ ┣ 📂rut_usuario4<br />
 ┃ ┃ ┗ 📂rut_usuario.....<br />
 ┃ ┗ 📂rut_especialista.....<br />
 ┃ ┃ ┣ 📂rut_usuario1<br />
 ┃ ┃ ┣ 📂rut_usuario2<br />
 ┃ ┃ ┣ 📂rut_usuario3<br />
 ┃ ┃ ┣ 📂rut_usuario4<br />
 ┃ ┃ ┗ 📂rut_usuario.....<br />
 ┗ 📂fotos<br />
 ┃ ┣ 📜rut1.png<br />
 ┃ ┣ 📜rut2.png<br />
 ┃ ┣ 📜rut3.png<br />
 ┃ ┣ 📜rut4.png<br />
 ┃ ┣ 📜rut5.png<br />
 ┃ ┣ 📜rut6.png<br />
 ┃ ┣ 📜rut7.png<br />
 ┃ ┣ 📜rut8.png<br />
 ┃ ┣ 📜rut9.png<br />
 ┃ ┗ 📜rut_nn.png<br />
 📦proximahora<br />
 ┣ 📂__pycache__<br />
 ┣ 📜asgi.py<br />
 ┣ 📜funciones.py<br />
 ┣ 📜proximahora.code-workspace<br />
 ┣ 📜settings.py<br />
 ┣ 📜urls.py<br />
 ┣ 📜views.py<br />
 ┣ 📜wsgi.py<br />
 ┗ 📜__init__.py<br />
📦sql<br />
📦static<br />
 ┣ 📂css<br />
 ┃ ┣ 📂images<br />
 ┃ ┃ ┣ 📜sort_asc.png<br />
 ┃ ┃ ┣ 📜.......png<br />
 ┃ ┣ 📜buttons.dataTables.min.css<br />
 ┃ ┣ 📜buttons.jqueryui.min.css<br />
 ┃ ┣ 📜checkpassword.css<br />
 ┃ ┣ 📜dataTables.jqueryui.min.css<br />
 ┃ ┣ 📜dataTables.min.css<br />
 ┃ ┣ 📜jquery-ui-nativo.css<br />
 ┃ ┣ 📜jquery-ui.css<br />
 ┃ ┣ 📜jquery-ui.min.css<br />
 ┃ ┣ 📜jquery-ui.structure.css<br />
 ┃ ┣ 📜jquery-ui.structure.min.css<br />
 ┃ ┣ 📜jquery-ui.theme.css<br />
 ┃ ┣ 📜jquery-ui.theme.min.css<br />
 ┃ ┣ 📜jquery.dataTables.min.css<br />
 ┃ ┣ 📜jquery.smartmenus.bootstrap-4.css<br />
 ┃ ┣ 📜sm-blue.css<br />
 ┃ ┣ 📜sm-clean.css<br />
 ┃ ┣ 📜sm-core-css.css<br />
 ┃ ┣ 📜sm-mint.css<br />
 ┃ ┣ 📜style.css<br />
 ┃ ┣ 📜system copy.css<br />
 ┃ ┗ 📜system.css<br />
 ┣ 📂imagenes<br />
 ┃ ┣ 📜ajax-loader.gif<br />
 ┃ ┣ 📜ajax-loader1.gif<br />
 ┃ ┣ 📜ajax-loader2.gif<br />
 ┃ ┣ 📜ajax-loader3.gif<br />
 ┃ ┣ 📜header_bkgr3.jpg<br />
 ┃ ┣ 📜icon_calendar.png<br />
 ┃ ┣ 📜logo.png<br />
 ┃ ┣ 📜logo.svg<br />
 ┃ ┣ 📜logow.svg<br />
 ┃ ┗ 📜month16.png<br />
 ┣ 📂img<br />
 ┃ ┣ 📂footer<br />
 ┃ ┃ ┗ 📜footer.png<br />
 ┃ ┣ 📜access.svg<br />
 ┃ ┣ 📜booking.svg<br />
 ┃ ┣ 📜CardHome.png<br />
 ┃ ┣ 📜desktop.png<br />
 ┃ ┣ 📜doctor.svg<br />
 ┃ ┣ 📜Dropdown.svg<br />
 ┃ ┣ 📜Ellipse.svg<br />
 ┃ ┣ 📜image57.png<br />
 ┃ ┣ 📜lupa.png<br />
 ┃ ┣ 📜Megaphone.png<br />
 ┃ ┣ 📜money.svg<br />
 ┃ ┣ 📜nosotros.jpg<br />
 ┃ ┣ 📜noticia1.png<br />
 ┃ ┣ 📜noticia2.png<br />
 ┃ ┣ 📜noticiasbutton.jpg<br />
 ┃ ┣ 📜plumber-with-his-arms-crossed.jpg<br />
 ┃ ┣ 📜proximahora1.png<br />
 ┃ ┣ 📜register.svg<br />
 ┃ ┣ 📜register.svg.png<br />
 ┃ ┣ 📜security.svg<br />
 ┃ ┣ 📜Star-1.png<br />
 ┃ ┣ 📜Star-2.png<br />
 ┃ ┣ 📜Star-3.png<br />
 ┃ ┣ 📜Star-4.png<br />
 ┃ ┣ 📜Star.png<br />
 ┃ ┣ 📜tax.svg<br />
 ┃ ┗ 📜ubication.svg<br />
 ┣ 📂jquery<br />
 ┃ ┣ 📂external<br />
 ┃ ┃ ┗ 📂jquery<br />
 ┃ ┃ ┃ ┗ 📜jquery.js<br />
 ┃ ┣ 📂images<br />
 ┃ ┃ ┣ 📜sort_asc.png<br />
 ┃ ┃ ┣ 📜sort_asc_disabled.png<br />
 ┃ ┃ ┣ 📜sort_both.png<br />
 ┃ ┃ ┣ 📜sort_desc.png<br />
 ┃ ┃ ┣ 📜sort_desc_disabled.png<br />
 ┃ ┃ ┣ 📜ui-......<br />
 ┃ ┣ 📜datatables.es-CL.json<br />
 ┃ ┣ 📜jquery-3.7.1.min.js<br />
 ┃ ┣ 📜jquery-ui.css<br />
 ┃ ┣ 📜jquery-ui.js<br />
 ┃ ┣ 📜jquery-ui.min.css<br />
 ┃ ┣ 📜jquery-ui.min.js<br />
 ┃ ┣ 📜jquery-ui.structure.css<br />
 ┃ ┣ 📜jquery-ui.structure.min.css<br />
 ┃ ┣ 📜jquery-ui.theme.css<br />
 ┃ ┣ 📜jquery-ui.theme.min.css<br />
 ┃ ┣ 📜jquery.dataTables.min.js<br />
 ┃ ┣ 📜jquery.smartmenus.bootstrap-4.min.js<br />
 ┃ ┣ 📜jquery.smartmenus.min.js<br />
 ┃ ┗ 📜package.json<br />
 ┗ 📂js
 ┃ ┣ 📂especialistas<br />
 ┃ ┃ ┣ 📜especialistas.js<br />
 ┃ ┃ ┗ 📜especialistas_det.js<br />
 ┃ ┣ 📂tablas<br />
 ┃ ┃ ┣ 📜categorias.js<br />
 ┃ ┃ ┣ 📜ciudades.js<br />
 ┃ ┃ ┣ 📜comunas.js<br />
 ┃ ┃ ┣ 📜formapagogral.js<br />
 ┃ ┃ ┣ 📜formapagosalud.js<br />
 ┃ ┃ ┣ 📜modalidadatencion.js<br />
 ┃ ┃ ┣ 📜planes.js<br />
 ┃ ┃ ┣ 📜promociones.js<br />
 ┃ ┃ ┣ 📜regiones.js<br />
 ┃ ┃ ┣ 📜rubros.js<br />
 ┃ ┃ ┣ 📜subcategorias.js<br />
 ┃ ┃ ┗ 📜tipoprevision.js<br />
 ┃ ┣ 📂usuarios<br />
 ┃ ┃ ┗ 📜personas.js<br />
 ┃ ┣ 📜buttons.dataTables.min.js<br />
 ┃ ┣ 📜buttons.jqueryui.min.js<br />
 ┃ ┣ 📜checkpassword.js<br />
 ┃ ┣ 📜datatables.min.js<br />
 ┃ ┣ 📜icon_calendar.png<br />
 ┃ ┣ 📜livevalidation.js<br />
 ┃ ┣ 📜livevalidation.min.js<br />
 ┃ ┣ 📜popper.min.js<br />
 ┃ ┗ 📜system.js<br />
📦tablas
 ┣ 📂migrations<br />
 ┣ 📂templates<br />
 ┃ ┣ 📂ciudades<br />
 ┃ ┃ ┣ 📜ciudades_ajax_list.html<br />
 ┃ ┃ ┣ 📜ciudades_ajax_select.html<br />
 ┃ ┃ ┗ 📜ciudades_list.html<br />
 ┃ ┣ 📂comunas<br />
 ┃ ┃ ┣ 📜comunas_ajax_list.html<br />
 ┃ ┃ ┣ 📜comunas_ajax_select.html<br />
 ┃ ┃ ┗ 📜comunas_list.html<br />
 ┃ ┣ 📂regiones<br />
 ┃ ┃ ┣ 📜regiones_ajax_list.html<br />
 ┃ ┃ ┗ 📜regiones_list.html<br />
 ┃ ┗ 📂varios<br />
 ┃ ┃ ┣ 📜categorias_ajax_list.html<br />
 ┃ ┃ ┣ 📜categorias_ajax_select.html<br />
 ┃ ┃ ┣ 📜categorias_list.html<br />
 ┃ ┃ ┣ 📜formapagogral_ajax_list.html<br />
 ┃ ┃ ┣ 📜formapagogral_list.html<br />
 ┃ ┃ ┣ 📜formapagosalud_ajax_list.html<br />
 ┃ ┃ ┣ 📜formapagosalud_list.html<br />
 ┃ ┃ ┣ 📜modalidadatencion_ajax_list.html<br />
 ┃ ┃ ┣ 📜modalidadatencion_list.html<br />
 ┃ ┃ ┣ 📜planes_ajax_list.html<br />
 ┃ ┃ ┣ 📜planes_list.html<br />
 ┃ ┃ ┣ 📜promociones_ajax_list.html<br />
 ┃ ┃ ┣ 📜promociones_list.html<br />
 ┃ ┃ ┣ 📜rubros_ajax_list.html<br />
 ┃ ┃ ┣ 📜rubros_list.html<br />
 ┃ ┃ ┣ 📜subcategorias_ajax_list.html<br />
 ┃ ┃ ┣ 📜subcategorias_ajax_select.html<br />
 ┃ ┃ ┣ 📜subcategorias_list.html<br />
 ┃ ┃ ┣ 📜tipoprevision_ajax_list.html<br />
 ┃ ┃ ┗ 📜tipoprevision_list.html<br />
 ┣ 📂__pycache__<br />
 ┣ 📜admin.py<br />
 ┣ 📜apps.py<br />
 ┣ 📜models.py<br />
 ┣ 📜tests.py<br />
 ┣ 📜urls.py<br />
 ┣ 📜views.py<br />
 ┗ 📜__init__.py<br />
📦templates<br />
 ┣ 📜about.html<br />
 ┣ 📜ayuda.html<br />
 ┣ 📜base-adm3.html<br />
 ┣ 📜base.html<br />
 ┣ 📜base_ace.html<br />
 ┗ 📜index.html<br />
📦usuarios<br />
 ┣ 📂migrations<br />
 ┣ 📂templates<br />
 ┃ ┣ 📜personas_ajax_list.html<br />
 ┃ ┗ 📜personas_list.html<br />
 ┣ 📂__pycache__<br />
 ┣ 📜admin.py<br />
 ┣ 📜apps.py<br />
 ┣ 📜models.py<br />
 ┣ 📜tests.py<br />
 ┣ 📜urls.py<br />
 ┣ 📜views.py<br />
 ┗ 📜__init__.py<br />
📦venv<br />
📜gitignore<br />
📜manage.py<br />
📜README.md<br />
📜requirements.txt<br />
***