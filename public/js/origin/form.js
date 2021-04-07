var mandatory_fields=getMandatoryFields();function changeDoc(){origin.changed=!0,initializeMandatoryFields(),removeMandatoryHighlight(mandatory_fields),enableSaveButton()}function initializeMandatoryFields(){highlightMandatoryFields(mandatory_fields=getMandatoryFields())}function getMandatoryFields(){var t=[];return $form_elements=$("form").find("input, select, textarea"),$.each($form_elements,function(e,a){"yes"==$(this).data("mandatory")&&t.push($(a)[0])}),t}function highlightMandatoryFields(t){t||(t=getMandatoryFields()),$.each(t,function(t,e){""==$.trim($(this).val())&&($(e).closest(".table_record")||$(e).closest(".form-group").addClass("has-error"),$(e).addClass("error"))})}function removeMandatoryHighlight(t){t||(t=getMandatoryFields()),$.each(t,function(){$parent_div=$(this).closest(".form-group"),$.trim($(this).val())?($(this).closest(".table_record")||$($parent_div).removeClass("has-error"),$(this).removeClass("error")):($(this).closest(".table_record")||$($parent_div).addClass("has-error"),$(this).addClass("error"))})}function makeFieldsReadable(){$form_elements=$("form").find("input, select, textarea"),$.each($form_elements,function(t,e){var a=$(e).attr("type");if(!["hidden","file"].contains(a)){var i="";if("checkbox"==a)i=$(e).is(":checked")?'<i class="far fa-check-square"></i>':'<i class="far fa-square"></i>';else{var n=$(e).val();"active"==$(e).attr("name")&&(n=parseInt(n)?"Yes":"No"),i='<p class="form-control-static origin-static">'+(n=n||"")+"</p>"}$(i).insertBefore($(e))}"file"==$(e).attr("type")&&$(e).closest(".btn").remove(),$(e).remove()}),$.each($("table"),function(t,e){$(e).find("th.remove").remove(),$(e).find(".remove-row").closest("td").remove(),$(e).find(".new-row").closest("tr").remove()})}function enableSaveButton(){form_changed=!0,$("body").find("#save_form").removeClass("disabled"),$("body").find("#save_form").prop("disabled",!1),$("body").find("#form-stats > i").removeClass("text-green").addClass("text-warning"),$("body").find("#form-status").html("Not Saved")}function showImagePreview(t){if(t.files&&t.files[0]){var e=new FileReader;e.onload=function(e){var a='<img src="'+e.target.result+'">';$(t).closest(".media").find(".avatar-box").empty().append(a)},e.readAsDataURL(t.files[0])}}function setDocData(){void 0!==origin.data&&origin.data&&($.each(origin.data,function(t,e){$.each(e,function(a,i){if("string"==typeof i||"number"==typeof i){var n=$("form#"+origin.slug).find('[name="'+a+'"]');$(n).length&&"file"!=$(n).attr("type")&&("string"==typeof i&&(i.isDate()||i.isDateTime())&&($(n).attr("data-field-value",i),i=i.isDateTime()?moment.utc(i).local().format("DD-MM-YYYY hh:mm A"):moment.utc(i).local().format("DD-MM-YYYY")),$(n).val(i))}else if("object"==typeof i&&i)return addNewRows(t,e),!1})}),$("form#"+origin.slug).find(".text-editor, .text-editor-advanced").each(function(t,e){$(e).trumbowyg("html",$(e).val())}),origin.permissions.update||($("body").find(".text-editor, .text-editor-advanced").trumbowyg("disable"),$("body").find(".text-editor, .text-editor-advanced").remove()))}function addFormStatic(t,e){var a='<div class="col-md-3"><span class="control-label">'+t+"</span>: "+e+"</div>";if($("body").find(".form-statics").length){var i=$("body").find(".form-statics");$(i).find(".static-list").append(a)}else{i='<div class="card form-section elevation-2">            <div class="card-header form-statics">                <div class="row static-list">'+a+"</div>            </div>        </div>";$("body").find(".form-section").first().before(i)}}function addNewRow(t,e,a){$(t).find("thead");var i=$(t).find("tbody");$(i).find("tr").hasClass("odd")&&$(i).empty(),addRow(t,e||$(i).find("tr").length+1,a)}function addRow(t,e,a){var i=$(t).data("table"),n=$(t).find("thead"),o=$(t).find("tbody"),d=a||"create",s=[],l='<tr class="table_record">';$.each($(n).find("tr > th"),function(t,a){if($(a).hasClass("sr-no")&&0==t)l+='<td class="text-center" style="vertical-align: middle;"></td>';else if($(a).hasClass("remove"))l+='<td class="text-center" data-idx="'+e+'">                <button type="button" class="btn btn-danger btn-xs remove-row">                    <i class="fas fa-times"></i>                </button>            </td>';else if($(a).hasClass("action"))l+='<td class="action" style="display: none;">                <input type="text" class="form-control input-sm" name="'+i+"["+(e-1)+'][action]" value="'+d+'">            </td>',$(this).find('input[name="'+i+"["+(e-1)+'][action]"]').val(d);else if($(a).hasClass("row-id"))l+='<td class="row-id" style="display: none;">                <input type="text" class="form-control input-sm" name="'+i+"["+(e-1)+'][id]">            </td>';else{var n=$(a).data("field-type"),o=$(a).data("field-name"),r=$(a).data("ac-module"),c=$(a).data("ac-field"),f="yes"==$(a).data("readonly")?"readonly":"",m="yes"==$(a).data("hidden")?"style='display: none;'":"";s.push(n),"link"==n?l+='<td data-field-type="link">                    <input type="text" class="form-control input-sm autocomplete"                     name="'+i+"["+(e-1)+"]["+o+']"                     autocomplete="off" data-ac-module="'+r+'" data-ac-field="'+c+'"'+f+">                </td>":"image"==n?l+='<td data-field-type="image">                    <div class="col-md-12 media">                        <div class="pull-left text-center avatar-box">                            <i class="fas fa-image inline fa-2x avatar"></i>                        </div>                        <div class="media-body text-left">                            <label title="Upload image file" class="btn btn-primary btn-xs">                                <input type="file" accept="image/*" name="'+i+"["+(e-1)+"]["+o+']" class="hide">                                Change                            </label>                        </div>                    </div>                </td>':"select"==n?(l+='<td data-field-type="select">                    <select class="form-control input-sm" name="'+i+"["+(e-1)+"]["+o+']">',$.each($(a).data("options").split(","),function(t,e){if(2==(e=(e=trim(e)).split(":")).length)var a=e[1],i=e[0];else a=e[0],i=e[0];l+='<option value="'+a+'">'+i+"</option>"}),l+="</select></td>"):"checkbox"==n?l+='<td data-field-type="checkbox"'+m+' class="text-center" style="vertical-align: middle;">                    <input type="hidden" class="checkbox-value" name="'+i+"["+(e-1)+"]["+o+']" value="0">                    <input type="checkbox" name="'+i+"["+(e-1)+"]["+o+']" '+f+">                </td>":"date"==n?l+='<td data-field-type="date">                    <div class="input-group date">                        <span class="input-group-addon">                            <i class="fas fa-calendar-alt"></i>                        </span>                        <input type="text" name="'+i+"["+(e-1)+"]["+o+']" class="form-control input-sm" autocomplete="off">                    </div>                </td>':"datetime"==n?l+='<td data-field-type="datetime">                    <div class="input-group datetimepicker">                        <span class="input-group-addon">                            <i class="fas fa-calendar-alt"></i>                        </span>                        <input type="text" name="'+i+"["+(e-1)+"]["+o+']" class="form-control input-sm" autocomplete="off">                    </div>                </td>':"text"==n?l+=r&&c?'<td data-field-type="'+n+'"'+m+'>                        <input type="text" name="'+i+"["+(e-1)+"]["+o+']"                         class="form-control input-sm" data-ac-module="'+r+'" data-ac-field="'+c+'" autocomplete="off"'+f+">                    </td>":'<td data-field-type="'+n+'"'+m+'>                        <input type="text" name="'+i+"["+(e-1)+"]["+o+']"                         class="form-control input-sm" autocomplete="off"'+f+">                    </td>":"textarea"==n?l+='<td data-field-type="textarea"'+m+'>                    <textarea rows="5" cols="8" name="'+i+"["+(e-1)+"]["+o+']"                     class="form-control input-sm" autocomplete="off"></textarea>                </td>':"blank"==n&&(l+='<td data-field-type="blank" data-field-name="'+o+'"'+m+"></td>")}}),l+="</tr>",$(o).append(l),maintainIdx(o),enableAutocomplete(),setPickersInTable(i,t,s)}function maintainIdx(t){var e=1;$.each($(t).find("tr"),function(t,a){$(a).is(":visible")&&($(a).attr("idx",e),$(a).find("td:first").html(e),e++)})}function showEmptyRow(t){var e='<tr class="odd">        <td valign="middle" align="center" colspan="'+$(t).find("thead > tr > th").length+'">Empty</td>    </tr>';$(t).find("tbody").append(e)}function addNewRows(t,e){var a=$('table[data-table="'+t+'"]'),i=$(a).find("thead"),n=$(a).find("tbody"),o=[],d="";$(n).find("tr").hasClass("odd")&&$(n).empty();var s=$(n).find("tr").length;$.each(e,function(e,a){s&&(e=s),d+='<tr class="table_record">',$.each($(i).find("tr > th"),function(i,n){var s=$(n).data("field-type"),l=$(n).data("field-name"),r=$(n).data("ac-module"),c=$(n).data("ac-field"),f="yes"==$(n).data("readonly")?"readonly":"",m="yes"==$(n).data("hidden")?"style='display: none;'":"";if(o.push(s),a[l]&&"string"==typeof a[l]&&(a[l].isDate()||a[l].isDateTime())?a[l].split(" ").length>1?field_value=moment.utc(a[l]).local().format("DD-MM-YYYY hh:mm A"):field_value=moment.utc(a[l]).local().format("DD-MM-YYYY"):a[l]&&"string"==typeof a[l]&&a[l].isTime()?field_value=moment.utc(a[l],["HH:mm:ss"]).local().format("HH:mm"):field_value=a[l]||"",$(n).hasClass("sr-no"))d+='<td class="text-center" style="vertical-align: middle;">'+(e+1)+"</td>";else if($(n).hasClass("remove"))d+='<td class="text-center" data-idx="'+(e+1)+'">                    <button type="button" class="btn btn-danger btn-xs remove-row">                        <i class="fas fa-times"></i>                    </button>                </td>';else if($(n).hasClass("action")){if(a.id)var p="none";else p="create";d+='<td class="action" style="display: none;">                    <input type="text" class="form-control input-sm" name="'+t+"["+e+'][action]" value="'+p+'">                </td>'}else $(n).hasClass("row-id")?d+='<td class="row-id" style="display: none;">                    <input type="text" class="form-control input-sm" name="'+t+"["+e+'][id]" value="'+a.id+'">                </td>':"link"==s?d+='<td data-field-type="link">                        <input type="text" class="form-control input-sm autocomplete"                         name="'+t+"["+e+"]["+l+']"                         autocomplete="off" data-ac-module="'+r+'" data-ac-field="'+c+'"'+f+' value="'+field_value+'">                    </td>':"image"==s?(d+='<td data-field-type="image">                        <div class="col-md-12 media">                            <div class="pull-left text-center avatar-box">',a[l]?d+='<img src="'+a[l]+'" class="fancyimg" data-big="'+getImage(a[l])+'" alt="Image">':d+='<i class="fas fa-image inline fa-2x avatar"></i>',d+='</div>                            <div class="media-body text-left">                                <label title="Upload image file" class="btn btn-primary btn-xs">                                    <input type="file" accept="image/*" name="'+t+"["+e+"]["+l+']" class="hide">                                    Change                                </label>                            </div>                        </div>                    </td>'):"select"==s?(d+='<td data-field-type="select">                        <select class="form-control input-sm" name="'+t+"["+e+"]["+l+']">',$.each($(n).data("options").split(","),function(t,e){if(2==(e=(e=trim(e)).split(":")).length)var i=e[1],n=e[0];else i=e[0],n=e[0];i==a[l]?d+='<option value="'+i+'" default selected>'+n+"</option>":d+='<option value="'+i+'">'+n+"</option>"}),d+="</select></td>"):"checkbox"==s?d+='<td data-field-type="checkbox"'+m+' class="text-center" style="vertical-align: middle;">                        <input type="hidden" class="checkbox-value" name="'+t+"["+e+"]["+l+']" '+f+' value="'+(parseInt(field_value)?1:0)+'">                        <input type="checkbox" name="'+t+"["+e+"]["+l+']" '+f+(parseInt(field_value)?" checked":"")+">                    </td>":"date"==s?d+='<td data-field-type="date">                        <div class="input-group date">                            <span class="input-group-addon">                                <i class="fas fa-calendar-alt"></i>                            </span>                            <input type="text" name="'+t+"["+e+"]["+l+']" class="form-control input-sm" autocomplete="off" value="'+field_value+'">                        </div>                    </td>':"datetime"==s?d+='<td data-field-type="datetime">                        <div class="input-group datetimepicker">                            <span class="input-group-addon">                                <i class="fas fa-calendar-alt"></i>                            </span>                            <input type="text" name="'+t+"["+e+"]["+l+']" class="form-control input-sm" autocomplete="off" value="'+field_value+'">                        </div>                    </td>':"text"==s?d+=r&&c?'<td data-field-type="'+s+'"'+m+'>                            <input type="text" name="'+t+"["+e+"]["+l+']"                             class="form-control input-sm" data-ac-module="'+r+'" data-ac-field="'+c+'" autocomplete="off"'+f+' value="'+field_value+'">                        </td>':'<td data-field-type="'+s+'"'+m+'>                            <input type="text" name="'+t+"["+e+"]["+l+']"                             class="form-control input-sm" autocomplete="off"'+f+' value="'+field_value+'">                        </td>':"textarea"==s?d+='<td data-field-type="textarea"'+m+'>                        <textarea rows="5" cols="8" name="'+t+"["+e+"]["+l+']"                         class="form-control" autocomplete="off">'+field_value+"</textarea>                    </td>":"blank"==s&&(d+='<td data-field-type="blank" data-field-name="'+l+'"'+m+">"+field_value+"</td>")}),d+="</tr>",s&&s++}),$(n).append(d),enableAutocomplete(),setPickersInTable(t,a,o),enableFancyBox()}function setPickersInTable(t,e,a){a.contains("date")&&$.each($("table > tbody > tr").find(".date"),function(a,i){$(i).datetimepicker({icons:{time:"fas fa-clock",date:"fas fa-calendar-alt",up:"fas fa-chevron-up",down:"fas fa-chevron-down",previous:"fas fa-chevron-left",next:"fas fa-chevron-right",today:"fas fa-crosshairs",clear:"fas fa-trash",close:"fas fa-times"},format:"DD-MM-YYYY",allowInputToggle:!0}).on("dp.change",function(a){if(void 0!==origin.data[t])var n=origin.data[t].length;else n=0;var o=$(e).find("tbody > tr").length;$.trim($("body").find('[name="id"]').val())&&n==o&&$(i).closest("tr").find("td.action > input").val("update"),"function"==typeof changeDoc&&changeDoc()})}),a.contains("datetime")&&$.each($("table > tbody > tr").find(".datetimepicker"),function(a,i){$(i).datetimepicker({icons:{time:"fas fa-clock",date:"fas fa-calendar-alt",up:"fas fa-chevron-up",down:"fas fa-chevron-down",previous:"fas fa-chevron-left",next:"fas fa-chevron-right",today:"fas fa-crosshairs",clear:"fas fa-trash",close:"fas fa-times"},format:"DD-MM-YYYY hh:mm A",allowInputToggle:!0}).on("dp.change",function(a){if(void 0!==origin.data[t])var n=origin.data[t].length;else n=0;var o=$(e).find("tbody > tr").length;$.trim($("body").find('[name="id"]').val())&&n==o&&$(i).closest("tr").find("td.action > input").val("update"),"function"==typeof changeDoc&&changeDoc()})})}$(document).ready(function(){var t=!1;$("form#"+origin.slug).on("change input","input, select, textarea",function(){changeDoc()}),$("form#"+origin.slug).on("change","input[type='file']",function(){$(this).val()&&showImagePreview(this)}),$("body").on("click","#delete",function(){var t=app_route,e=t.split("/").pop(),a=t.replace("/"+e,"/delete/"+e);msgbox("Sure you want to delete this record permanently?",'<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">No</button>            <a class="btn btn-danger btn-sm" href="'+a+'" id="yes" name="yes">                Delete            </a>')}),$("body").on("click","#save_form",function(){$("body").find("#"+origin.slug).submit()}),setDocData(),initializeMandatoryFields(),enableAutocomplete(),$("body").find('[name="id"]').val()?origin.permissions.update||(t=!0):origin.permissions.create||(t=!0),"Settings"==origin.module&&(t=!1),t&&makeFieldsReadable(),$("form#"+origin.slug).submit(function(t){var e=!0;$.each(mandatory_fields,function(a,i){if(!trim($(i).val())){t.preventDefault(),e=!1;var n=$(i).attr("name");return $(i).closest(".table_record")&&n.match(/\[(.*?)\]/g)&&(n=n.match(/\[(.*?)\]/g).pop().replace("[","").replace("]","")),notify("Please Enter "+n.replace("_"," ").toProperCase(),"error"),$(i).focus(),!1}}),e&&($.each($("form#"+origin.slug).find("input[type='checkbox']"),function(t,e){this.checked?($(this).val("1"),$(this).closest(".checkbox-value").prop("disabled",!0)):$(this).val("0")}),$("body").find(".data-loader-full").show())})}),window.origin.make={button:function(t){var e=t.text,a=t.name;if(void 0!==t.class&&t.class)var i="btn "+t.class;else i="btn btn-primary";var n=document.createElement("button");n.setAttribute("type","button"),n.setAttribute("name",a),n.setAttribute("id",a),n.setAttribute("class",i),n.appendChild(document.createTextNode(e)),$("body").find(".ibox-tools").prepend(n),void 0!==t.on_click&&t.on_click&&$("#"+a).on("click",function(){t.on_click()})}},$(document).ready(function(){$("body").on("click",".new-row",function(){var t=$("#"+$(this).data("target"));addNewRow(t),$(t).find("tr:last > td:eq(3) > input").focus()}),$("table").on("click",".remove-row",function(){var t=$(this).closest("table"),e=($(t).attr("id"),$(t).find("tbody")),a=($(t).data("table"),$(this).closest(".table_record").find(".row-id"));a=$(a).find('input[name$="[id]"]'),$("body").find('[name="id"]').val()&&$(a).val()?($(this).closest("tr.table_record").find("td.action").find("input").val("delete"),$(this).closest("tr.table_record").hide()):$(this).closest("tr").remove(),$(e).find("tr:visible").length?maintainIdx(e):showEmptyRow(t),enableSaveButton()}),$("table").on("click",".table_record",function(){$(this).find("input").removeClass("simple-box")}),$("table > tbody > tr").on("change","input, select, textarea",function(){$('[name="id"]').val()&&$(this).closest("tr").find("td.action > input").val("update"),"checkbox"==$(this).attr("type")&&(this.checked?$(this).parent().find(".checkbox-value").val("1"):$(this).parent().find(".checkbox-value").val("0"))})});
