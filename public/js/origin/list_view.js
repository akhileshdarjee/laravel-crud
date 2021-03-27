$(document).ready(function(){var t=1,e="",a=!1;function i(n,l){var d=function(){var t={},e=[],a=$("body").find("#sort-list-order").data("value"),i=$("body").find("#sort-field").data("value");t.sorting={field:i,order:a};var o=$("body").find(".list-active-filters .filter-tag");o.length&&($.each($(o),function(t,a){var i=$(a).data("cn"),o=$(a).data("co"),n=$(a).data("cv");i&&o&&(current_filters={column_name:i,column_operator:o,column_value:n},e.push(current_filters))}),t.filters=e);return t}();l?d.delete_list=l:a||$("body").find(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+n,data:d,dataType:"json",success:function(n){if(l)!function(e){$("body").find("#message-box").modal("hide");var o=[];$.each(e,function(t,e){e.success||o.push(e.msg)}),o&&o.length?$.each(o,function(t,e){notify(e,"error")}):notify("Records deleted successfully","success");e.length==o.length?$("body").find(".data-loader").hide():(a=!0,i(t))}(n.data);else{a=!1;var d=n.columns,r=n.rows.data,s=n.module.link_field;e=n.module.name;var c=n.module.form_title,f=n.rows.from,m=$("body").find(".list-view").attr("data-module",e),u="",p=app_route.replace("/list/","/form/");r.length>0&&$.each(r,function(t,e){var a=p+"/"+e[s];u+='<tr class="clickable_row" data-href="'+a+'" data-id="'+e.id+'">',n.can_delete?u+='<td width="10%" data-field-name="row_check" class="list-checkbox">                                    <input type="checkbox" name="post[]" value="'+(t+2)+'" id="check-'+(t+2)+'">                                </td>':u+='<td class="text-center">'+(f+t)+"</td>",$.each(d,function(t,i){var o=e[i];o||0==o||(o=""),["avatar","image"].contains(i)?u+=o?'<td data-field-name="'+i+'" class="client-avatar">                                            <img src="'+getImage(o,"32","32")+'" class="fancyimg img-circle" alt="'+e[c]+'" data-big="'+getImage(o)+'">                                        </td>':'<td data-field-name="'+i+'" class="client-avatar">                                            <span class="default-picture">                                                <i class="fa fa-picture-o"></i>                                            </span>                                        </td>':u+=i==c?'<td data-field-name="'+i+'" class="link-field">                                        <a href="'+a+'" class="form-link">'+o+"</a>                                    </td>":'<td data-field-name="'+i+'">'+o+"</td>"}),u+="</tr>"}),$(m).find(".list-view-items").empty().append(u),$("body").find(".list-page-no").html(n.rows.current_page||"0"),$("body").find(".item-count").html(n.rows.total||"0"),$("body").find(".item-from").html(n.rows.from||"0"),$("body").find(".item-to").html(n.rows.to||"0"),$("body").find(".origin-pagination-content").empty().append(makePagination(n.rows)),o(),beautifyListView(),$("body").find(".data-loader").hide()}},error:function(t){notify("Some error occured. Please try again","error"),$("body").find(".data-loader").hide()}})}function o(){var t=$(".list-view").find(".list-view-items"),e=$(t).find("input[type='checkbox']:checked").length;if(function(t){var e=$(".list-view").find(".list-view-items"),a=$(e).find("input[type='checkbox']").length;if(!t)var t=$(e).find("input[type='checkbox']:checked").length;t&&t==a?$("body").find("#check-all").prop("checked",!0):$("body").find("#check-all").prop("checked",!1)}(e),e>0){var a=e+" of "+$("body").find(".item-count").html()+" selected";$("body").find(".record-selected-count").html(a),$("body").find(".record-selected-count").show(),$("body").find(".new-form").hide(),$("body").find(".delete-selected").show()}else $("body").find(".record-selected-count").html(""),$("body").find(".record-selected-count").hide(),$("body").find(".new-form").show(),$("body").find(".delete-selected").hide()}function n(){var t=$("body").find(".list-column-filters"),e=$(t).find('[name="column_name"] option:first').val(),a=$(t).find('[name="column_operator"] option:first').val();$(t).find('[name="column_name"]').val(e),$(t).find('[name="column_operator"]').val(a),$(".list-column-filters").find('[name="column_name"]').trigger("change")}function l(){var a=$("body").find("#sort-list-order").data("value"),o=$("body").find("#sort-field").data("value"),n=$("body").find(".sorting-fields").data("action");a&&o&&n&&($("body").find(".data-loader").show(),$.ajax({type:"POST",url:n,data:{sort_order:a,sort_field:o,module:e},dataType:"json",success:function(e){$("body").find(".data-loader").hide(),e.success?i(t):notify(e.msg,"error")},error:function(t){notify("Some error occured. Please try again","error"),$("body").find(".data-loader").hide()}}))}i(t),$("body").on("click","#add-filter",function(){n(),$(".list-column-filters").toggle()}),$("body").on("click",".refresh-list-view",function(){i(t=1)}),$("body").on("click","#sort-list-order",function(){var t="",e="";"desc"==$(this).data("value")?(e="asc",t='<i class="fa fa-arrow-up"></i>'):(e="desc",t='<i class="fa fa-arrow-down"></i>'),$(this).html(t),$(this).attr("data-value",e),$(this).data("value",e),l()}),$("body").on("click",".sort-list-by-name",function(t){t.preventDefault();var e=$(this).data("value"),a=$.trim($(this).html());$("body").find("#sort-field").attr("data-value",e),$("body").find("#sort-field").data("value",e),$("body").find("#sort-field").html(a),l()}),$(".list-view").on("click",".clickable_row",function(t){$(t.target).is("a")||"row_check"!=$(t.target).closest("td").attr("data-field-name")&&"checkbox"!=t.target.type&&($(t.target).is("img")||$(t.target).hasClass("fancyimg")||(window.location=$(this).data("href")))}),$("body").on("change",'.list-view .list-header [type="checkbox"]',function(t){t&&t.preventDefault();var e=$(t.target).closest(".list-view"),a=$(t.target).is(":checked");$('.list-view-items [type="checkbox"]',e).prop("checked",a),o()}),$("body").on("change",'.list-view .list-view-items [type="checkbox"]',function(t){o()}),$("body").on("click",".delete-selected",function(){!function(){var e=function(){var t=[],e=$(".list-view").find(".list-view-items");return $.each($(e).find("input[type='checkbox']"),function(e,a){$(a).is(":checked")&&t.push($(this).closest(".clickable_row").data("id"))}),t}();if(e.length>0){msgbox("Sure you want to delete selected records permanently?",'<button type="button" class="btn btn-sm" data-dismiss="modal">No</button>                <button type="button" class="btn btn-danger btn-sm" id="delete-records" data-loading-text="Deleting...">Yes</button>')}else notify("Please select any record to delete","error");$("#delete-records").on("click",function(){i(t,e)})}()}),$("body").on("click",".remove-column-filters",function(){n(),$(this).closest(".list-column-filters").hide()}),$("body").on("click",".apply-column-filters",function(){var e=$(this).closest(".list-column-filters"),a=$(e).find('[name="column_name"]').val(),o=$(e).find('[name="column_operator"]').val(),l=$(e).find('[name="column_value"]').val(),d=l;if($(e).find('[name="column_value"]').is("select")&&(d=$(e).find('[name="column_value"] option:selected').text()),a&&o){var r='<div class="btn-group filter-tag" data-cn="'+a+'" data-co="'+o+'" data-cv="'+l+'">                <button class="btn btn-white btn-xs" type="button">'+($(e).find('[name="column_name"] option:selected').text()+" "+o+" "+(d||"Null"))+'</button>                <button class="btn btn-white btn-xs remove-filter" type="button" data-toggle="tooltip" data-placement="right" title="Remove filter">                    <i class="fa fa-times"></i>                </button>            </div>';$("body").find(".list-active-filters").show(),$("body").find(".list-active-filters").append(r),n(),$(this).closest(".list-column-filters").hide(),i(t=1)}else notify("Please select Column Name & Column Operator","error")}),$(".list-column-filters").find('[name="column_name"]').on("change",function(){var t=$(this).find(":selected").val(),a=$(this).find(":selected").data("type"),i=$(this).closest(".list-column-filters"),o=$(i).find(".column-value-container"),n="";n="boolean"==a?'<select class="form-control" name="column_value" data-toggle="tooltip" data-placement="bottom" title="Filter value">                <option value="1">Yes</option>                <option value="0">No</option>            </select>':"date"==a?'<div class="input-group">                <span class="input-group-addon">                    <i class="fa fa-calendar"></i>                </span>                <input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">            </div>':"datetime"==a?'<div class="input-group datetimepicker">                <span class="input-group-addon">                    <i class="fa fa-calendar"></i>                </span>                <input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">            </div>':'<input type="text" name="column_value" class="form-control autocomplete" autocomplete="off" data-ac-module="'+e+'" data-ac-field="'+t+'" data-ac-unique="Yes" data-toggle="tooltip" data-placement="bottom" title="Filter value">',$(o).empty().append(n),"date"==a?enableDatepicker():"datetime"==a?enableDateTimepicker():"boolean"!=a&&enableAutocomplete()}),$("body").on("click",".filter-tag .remove-filter",function(e){$(this).tooltip("hide"),$(this).closest(".filter-tag").remove(),i(t)}),$("body").on("click",".origin-pagination a",function(e){e.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&i(t=$(this).attr("href").split("page=")[1])}),$("body").on("click","#import-from-csv",function(){var t=$(this).attr("title");t||(t=$(this).data("original-title"));var e='<div class="row">            <div class="col-md-12">                <form method="POST" name="import-form" id="import-form" enctype="multipart/form-data">                    <div class="row">                        <div class="col-md-12">                            <div class="form-group text-center">                                <label class="control-label">Import File (.csv, .xls, .xlsx)</label><br>                                <label title="Upload file" for="import_file" class="btn btn-primary btn-sm">                                    <input type="file" accept=".csv, .xls, .xlsx" name="import_file" id="import_file" class="hide">                                    Change                                </label>                                <input type="hidden" class="form-control" name="module" value="'+$(this).data("module")+'">                                <div id="import-file-name"></div>                            </div>                        </div>                    </div>                    <div class="row">                        <div class="col-md-12">                            <div class="import-progress progress progress-sm active" style="display: none;">                                <div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">                                </div>                            </div>                            <button type="button" class="btn btn-block btn-primary" id="start-importing">Import</button>                        </div>                    </div>                </form>            </div>        </div>';msgbox(e,null,t),$("#import_file").on("change",function(){$("#import-file-name").html(document.getElementById("import_file").files[0].name)}),$("#start-importing").on("click",function(){var t=this,e=$(this).closest("#import-form");if($(e).find(".progress").show(),$(t).hide(),document.getElementById("import_file").files[0].name){var a=new FormData($(e)[0]);$.ajax({url:base_url+"/import_from_csv",type:"POST",data:a,cache:!1,contentType:!1,processData:!1,success:function(a){a.success?location.reload():($(e).find(".progress").hide(),$(t).show(),notify(a.msg,"error"))},error:function(a){$(e).find(".progress").hide(),$(t).show(),notify("Some internal error occured. Please try again...!!!","error")}})}})}),$(window).on("hashchange",function(){if(window.location.hash){var t=window.location.hash.replace("#","");if(t==Number.NaN||t<=0)return!1;i(t)}})});
