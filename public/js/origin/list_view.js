$(document).ready(function(){var e=1,t="",a=!1;function o(n,l){var s=function(){var e={},t=[],a=$("body").find("#sort-list-order").data("value"),o=$("body").find("#sort-field").data("value");e.sorting={field:o,order:a};var i=$("body").find(".list-active-filters .filter-tag");i.length&&($.each($(i),function(e,a){var o=$(a).data("cn"),i=$(a).data("co"),n=$(a).data("cv");o&&i&&(current_filters={column_name:o,column_operator:i,column_value:n},t.push(current_filters))}),e.filters=t);return e}();l?s.delete_list=l:a||$("body").find(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+n,data:s,dataType:"json",success:function(n){if(l)!function(t){$("body").find("#message-box").modal("hide");var i=[];$.each(t,function(e,t){t.success||i.push(t.msg)}),i&&i.length?$.each(i,function(e,t){notify(t,"error")}):notify("Records deleted successfully","success");t.length==i.length?$("body").find(".data-loader").hide():(a=!0,o(e))}(n.data);else{a=!1;var s=n.columns,d=n.rows.data,r=n.module.link_field;t=n.module.name;var c=n.module.form_title,f=n.rows.from,m=$("body").find(".list-view").attr("data-module",t),u="",p=app_route.replace("/list/","/form/");d.length>0&&$.each(d,function(e,a){var o=p+"/"+a[r];u+='<tr class="clickable_row" data-href="'+o+'" data-id="'+a.id+'">',n.can_delete?u+='<td width="10%" data-field-name="row_check">                                    <div class="custom-control custom-checkbox text-center">                                        <input type="checkbox" name="post[]" id="check-'+(e+2)+'" class="custom-control-input">                                        <label class="custom-control-label" for="check-'+(e+2)+'"></label>                                    </div>                                </td>':u+='<td class="text-center">'+(f+e)+"</td>",$.each(s,function(e,i){var n=a[i];if(n||0==n||(n=""),["avatar","image"].contains(i))if(n)u+='<td data-field-name="'+i+'" class="client-avatar">                                            <img src="'+getImage(n,"32","32")+'" class="fancyimg img-circle" alt="'+a[c]+'" data-big="'+getImage(n)+'">                                        </td>';else{if("User"==t)var l="fas fa-user";else l="fas fa-image";u+='<td data-field-name="'+i+'" class="client-avatar">                                            <span class="default-picture default-picture-rounded">                                                <i class="'+l+'"></i>                                            </span>                                        </td>'}else u+=i==c?'<td data-field-name="'+i+'" class="link-field">                                        <a href="'+o+'" class="form-link">'+n+"</a>                                    </td>":'<td data-field-name="'+i+'">'+n+"</td>"}),u+="</tr>"}),$(m).find(".list-view-items").empty().append(u),$("body").find(".list-page-no").html(n.rows.current_page||"0"),$("body").find(".item-count").html(n.rows.total||"0"),$("body").find(".item-from").html(n.rows.from||"0"),$("body").find(".item-to").html(n.rows.to||"0"),$("body").find(".origin-pagination-content").empty().append(makePagination(n.rows)),i(),beautifyListView(),$("body").find(".data-loader").hide()}},error:function(e){notify("Some error occured. Please try again","error"),$("body").find(".data-loader").hide()}})}function i(){var e=$(".list-view").find(".list-view-items"),t=$(e).find("input[type='checkbox']:checked").length;if(function(e){var t=$(".list-view").find(".list-view-items"),a=$(t).find("input[type='checkbox']").length;if(!e)var e=$(t).find("input[type='checkbox']:checked").length;e&&e==a?$("body").find("#check-all").prop("checked",!0):$("body").find("#check-all").prop("checked",!1)}(t),t>0){var a=t+" of "+$("body").find(".item-count").html()+" selected";$("body").find(".record-selected-count").html(a),$("body").find(".record-selected-count").show(),$("body").find(".new-form").hide(),$("body").find(".delete-selected").show()}else $("body").find(".record-selected-count").html(""),$("body").find(".record-selected-count").hide(),$("body").find(".new-form").show(),$("body").find(".delete-selected").hide()}function n(){var e=$("body").find(".list-column-filters"),t=$(e).find('[name="column_name"] option:first').val(),a=$(e).find('[name="column_operator"] option:first').val();$(e).find('[name="column_name"]').val(t),$(e).find('[name="column_operator"]').val(a),$(".list-column-filters").find('[name="column_name"]').trigger("change")}function l(){var a=$("body").find("#sort-list-order").data("value"),i=$("body").find("#sort-field").data("value"),n=$("body").find(".sorting-fields").data("action");a&&i&&n&&($("body").find(".data-loader").show(),$.ajax({type:"POST",url:n,data:{sort_order:a,sort_field:i,module:t},dataType:"json",success:function(t){$("body").find(".data-loader").hide(),t.success?o(e):notify(t.msg,"error")},error:function(e){notify("Some error occured. Please try again","error"),$("body").find(".data-loader").hide()}}))}o(e),$("body").on("click","#add-filter",function(){n(),$(".list-column-filters").toggle()}),$("body").on("click",".refresh-list-view",function(){o(e=1)}),$("body").on("click","#sort-list-order",function(){var e="",t="";"desc"==$(this).data("value")?(t="asc",e='<i class="fas fa-sort-amount-up"></i>'):(t="desc",e='<i class="fas fa-sort-amount-down"></i>'),$(this).html(e),$(this).attr("data-value",t),$(this).data("value",t),l()}),$("body").on("click",".sort-list-by-name",function(e){e.preventDefault();var t=$(this).data("value"),a=$.trim($(this).html());$("body").find("#sort-field").attr("data-value",t),$("body").find("#sort-field").data("value",t),$("body").find("#sort-field").html(a),l()}),$(".list-view").on("click",".clickable_row",function(e){$(e.target).is("a")||"row_check"!=$(e.target).closest("td").attr("data-field-name")&&"checkbox"!=e.target.type&&($(e.target).is("img")||$(e.target).hasClass("fancyimg")||(window.location=$(this).data("href")))}),$("body").on("change",'.list-view .list-header [type="checkbox"]',function(e){e&&e.preventDefault();var t=$(e.target).closest(".list-view"),a=$(e.target).is(":checked");$('.list-view-items [type="checkbox"]',t).prop("checked",a),i()}),$("body").on("change",'.list-view .list-view-items [type="checkbox"]',function(e){i()}),$("body").on("click",".delete-selected",function(){!function(){var t=function(){var e=[],t=$(".list-view").find(".list-view-items");return $.each($(t).find("input[type='checkbox']"),function(t,a){$(a).is(":checked")&&e.push($(this).closest(".clickable_row").data("id"))}),e}();if(t.length>0){msgbox("Sure you want to delete selected records permanently?",'<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">No</button>                <button type="button" class="btn btn-danger btn-sm" id="delete-records">Yes</button>')}else notify("Please select any record to delete","error");$("#delete-records").on("click",function(){o(e,t)})}()}),$("body").on("click",".remove-column-filters",function(){n(),$(this).closest(".list-column-filters").hide()}),$("body").on("click",".apply-column-filters",function(){var t=$(this).closest(".list-column-filters"),a=$(t).find('[name="column_name"]').val(),i=$(t).find('[name="column_operator"]').val(),l=$(t).find('[name="column_value"]').val(),s=l;if($(t).find('[name="column_value"]').is("select")&&(s=$(t).find('[name="column_value"] option:selected').text()),a&&i){var d='<div class="btn-group filter-tag" data-cn="'+a+'" data-co="'+i+'" data-cv="'+l+'">                <button class="btn btn-white btn-sm elevation-1" type="button">'+($(t).find('[name="column_name"] option:selected').text()+" "+i+" "+(s||"Null"))+'</button>                <button class="btn btn-white btn-sm elevation-1 remove-filter" type="button" data-toggle="tooltip" data-placement="right" title="Remove filter">                    <i class="fas fa-times"></i>                </button>            </div>';$("body").find(".list-active-filters").show(),$("body").find(".list-active-filters").append(d),n(),$(this).closest(".list-column-filters").hide(),o(e=1)}else notify("Please select Column Name & Column Operator","error")}),$(".list-column-filters").find('[name="column_name"]').on("change",function(){var e=$(this).find(":selected").val(),a=$(this).find(":selected").data("type"),o=$(this).closest(".list-column-filters"),i=$(o).find(".column-value-container"),n="";n="boolean"==a?'<select class="custom-select" name="column_value" data-toggle="tooltip" data-placement="bottom" title="Filter value">                <option value="1">Yes</option>                <option value="0">No</option>            </select>':"date"==a?'<div class="input-group">                <span class="input-group-addon">                    <i class="fas fa-calendar-alt"></i>                </span>                <input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">            </div>':"datetime"==a?'<div class="input-group datetimepicker">                <span class="input-group-addon">                    <i class="fas fa-calendar-alt"></i>                </span>                <input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">            </div>':'<input type="text" name="column_value" class="form-control autocomplete" autocomplete="off" data-ac-module="'+t+'" data-ac-field="'+e+'" data-ac-unique="Yes" data-toggle="tooltip" data-placement="bottom" title="Filter value">',$(i).empty().append(n),"date"==a?enableDatepicker():"datetime"==a?enableDateTimepicker():"boolean"!=a&&enableAutocomplete()}),$("body").on("click",".filter-tag .remove-filter",function(t){$(this).tooltip("hide"),$(this).closest(".filter-tag").remove(),o(e)}),$("body").on("click",".origin-pagination a",function(t){t.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&o(e=$(this).attr("href").split("page=")[1])}),$("body").on("click","#import-from-csv",function(){var e=$(this).attr("title");e||(e=$(this).data("original-title"));var t='<div class="row">            <div class="col-md-12">                <form method="POST" name="import-form" id="import-form" enctype="multipart/form-data">                    <div class="row">                        <div class="col-md-12">                            <div class="form-group text-center">                                <label class="control-label">Import File (.csv, .xls, .xlsx)</label><br>                                <label title="Upload file" for="import_file" class="btn btn-secondary btn-sm">                                    <input type="file" accept=".csv, .xls, .xlsx" name="import_file" id="import_file" class="d-none">                                    Change                                </label>                                <input type="hidden" class="form-control" name="module" value="'+$(this).data("module")+'">                                <div id="import-file-name"></div>                            </div>                        </div>                    </div>                    <div class="row">                        <div class="col-md-12">                            <div class="import-progress progress progress-sm active" style="display: none;">                                <div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">                                </div>                            </div>                            <button type="button" class="btn btn-block btn-primary" id="start-importing">Import</button>                        </div>                    </div>                </form>            </div>        </div>';msgbox(t,null,e),$("#import_file").on("change",function(){$("#import-file-name").html(document.getElementById("import_file").files[0].name)}),$("#start-importing").on("click",function(){var e=this,t=$(this).closest("#import-form");if($(t).find(".progress").show(),$(e).hide(),document.getElementById("import_file").files[0].name){var a=new FormData($(t)[0]);$.ajax({url:base_url+"/import_from_csv",type:"POST",data:a,cache:!1,contentType:!1,processData:!1,success:function(a){a.success?location.reload():($(t).find(".progress").hide(),$(e).show(),notify(a.msg,"error"))},error:function(a){$(t).find(".progress").hide(),$(e).show(),notify("Some internal error occured. Please try again...!!!","error")}})}})}),$(window).on("hashchange",function(){if(window.location.hash){var e=window.location.hash.replace("#","");if(e==Number.NaN||e<=0)return!1;o(e)}})});
