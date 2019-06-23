$(document).ready(function(){function t(t,a){var i=l();a?i.delete_list=a:d||$(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+t,data:i,dataType:"json",success:function(t){if(a)n(t.data);else{d=!1;var i=t.columns,o=t.rows.data,l=t.module.link_field;c=t.module.name;var s=t.module.form_title,r=t.rows.from,m=$(".list-view").attr("data-module",c),f="",u=app_route.replace("/list/","/form/");o.length>0&&$.each(o,function(e,a){var o=u+"/"+a[l];f+='<tr class="clickable_row" data-href="'+o+'" data-id="'+a.id+'">',t.can_delete?f+='<td width="10%" data-field-name="row_check" class="list-checkbox">\t\t\t\t\t\t\t\t\t<input type="checkbox" name="post[]" value="'+(e+2)+'" id="check-'+(e+2)+'">\t\t\t\t\t\t\t\t</td>':f+='<td class="text-center">'+(r+e)+"</td>",$.each(i,function(t,e){var i=a[e];i||0==i||(i=""),["avatar","image"].contains(e)?f+=i?'<td data-field-name="'+e+'" class="client-avatar">\t\t\t\t\t\t\t\t\t\t\t<img src="'+getImage(i,"28","28")+'" title="'+s+'">\t\t\t\t\t\t\t\t\t\t</td>':'<td data-field-name="'+e+'" class="client-avatar">\t\t\t\t\t\t\t\t\t\t\t<span class="default-picture">\t\t\t\t\t\t\t\t\t\t\t\t<i class="fa fa-picture-o"></i>\t\t\t\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t\t\t</td>':f+=e==s?'<td data-field-name="'+e+'" class="link-field">\t\t\t\t\t\t\t\t\t\t<a href="'+o+'" class="form-link">'+i+"</a>\t\t\t\t\t\t\t\t\t</td>":'<td data-field-name="'+e+'">'+i+"</td>"}),f+="</tr>"}),$(".data-loader").hide(),$(m).find(".list-view-items").empty().append(f),e(),$("#item-count").html(t.rows.total||"0"),$("#item-from").html(t.rows.from||"0"),$("#item-to").html(t.rows.to||"0"),beautifyListView(),$(".origin-pagination-content").empty().append(makePagination(t.rows))}},error:function(t){notify(JSON.parse(t.responseText).message,"error"),$(".data-loader").hide()}})}function e(){var t=$(".list-view").find(".list-view-items"),e=$(t).find("input[type='checkbox']:checked").length;if(o(e),e>0){var a=$("#item-count").html(),i=e+" of "+a+" selected";$("body").find(".record-selected-count").html(i),$("body").find(".record-selected-count").show(),$("body").find(".new-form").hide(),$("body").find(".delete-selected").show()}else $("body").find(".record-selected-count").html(""),$("body").find(".record-selected-count").hide(),$("body").find(".new-form").show(),$("body").find(".delete-selected").hide()}function a(){var e=i();if(e.length>0){msgbox("Sure you want to delete selected records permanently?",'<button type="button" class="btn btn-sm" data-dismiss="modal">No</button>\t\t\t\t<button type="button" class="btn btn-danger btn-sm" id="delete-records" data-loading-text="Deleting...">Yes</button>')}else notify("Please select any record to delete","error");$("#delete-records").on("click",function(){$(this).button("loading"),t(r,e)})}function i(){var t=[],e=$(".list-view").find(".list-view-items");return $.each($(e).find("input[type='checkbox']"),function(e,a){$(a).is(":checked")&&t.push($(this).closest(".clickable_row").data("id"))}),t}function o(t){var e=$(".list-view").find(".list-view-items"),a=$(e).find("input[type='checkbox']").length;if(!t)var t=$(e).find("input[type='checkbox']:checked").length;t&&t==a?$("#check-all").prop("checked",!0):$("#check-all").prop("checked",!1)}function l(){var t={},e=[],a=$("#sort-list-order").data("value"),i=$("#sort-field").data("value");t.sorting={field:i,order:a};var o=$("body").find(".list-active-filters .filter-tag");return o.length&&($.each($(o),function(t,a){var i=$(a).data("cn"),o=$(a).data("co"),l=$(a).data("cv");i&&o&&(current_filters={column_name:i,column_operator:o,column_value:l},e.push(current_filters))}),t.filters=e),t}function n(e){$("#message-box").modal("hide");var a=[];$.each(e,function(t,e){e.success||a.push(e.msg)}),a&&a.length?$.each(a,function(t,e){notify(e,"error")}):notify("Records deleted successfully","success"),e.length==a.length?$(".data-loader").hide():(d=!0,t(r))}function s(){var t=$("body").find(".list-column-filters"),e=$(t).find('[name="column_name"] option:first').val(),a=$(t).find('[name="column_operator"] option:first').val();$(t).find('[name="column_name"]').val(e),$(t).find('[name="column_operator"]').val(a),$(".list-column-filters").find('[name="column_name"]').trigger("change")}var r=1,c="",d=!1;t(r),$("#add-filter").on("click",function(){s(),$(".list-column-filters").toggle()}),$(".refresh-list-view").on("click",function(){r=1,t(r)}),$("#sort-list-order").on("click",function(){var e=$(this).data("value"),a="",i="";"desc"==e?(i="asc",a='<i class="fa fa-arrow-up"></i>'):(i="desc",a='<i class="fa fa-arrow-down"></i>'),$(this).html(a),$(this).attr("data-value",i),$(this).data("value",i),t(r)}),$(".sort-list-by-name").on("click",function(e){e.preventDefault();var a=$(this).data("value"),i=$.trim($(this).html());$("#sort-field").attr("data-value",a),$("#sort-field").data("value",a),$("#sort-field").html(i),t(r)}),$(".list-view").on("click",".clickable_row",function(t){$(t.target).is("a")||"row_check"!=$(t.target).closest("td").attr("data-field-name")&&"checkbox"!=t.target.type&&(window.location=$(this).data("href"))}),$("body").on("change",'.list-view .list-header [type="checkbox"]',function(t){t&&t.preventDefault();var a=$(t.target).closest(".list-view"),i=$(t.target).is(":checked");$('.list-view-items [type="checkbox"]',a).prop("checked",i),e()}),$("body").on("change",'.list-view .list-view-items [type="checkbox"]',function(t){e()}),$(".delete-selected").on("click",function(){a()}),$(".remove-column-filters").on("click",function(){s(),$(this).closest(".list-column-filters").hide()}),$(".apply-column-filters").on("click",function(){var e=$(this).closest(".list-column-filters"),a=$(e).find('[name="column_name"]').val(),i=$(e).find('[name="column_operator"]').val(),o=$(e).find('[name="column_value"]').val();if(a&&i){var l=$(e).find('[name="column_name"] option:selected').text(),n=l+" "+i+" "+(o||"Null"),c='<div class="btn-group filter-tag" data-cn="'+a+'" data-co="'+i+'" data-cv="'+o+'">\t\t\t\t<button class="btn btn-white btn-xs" type="button">'+n+'</button>\t\t\t\t<button class="btn btn-white btn-xs remove-filter" type="button" data-toggle="tooltip" data-placement="right" title="Remove filter">\t\t\t\t\t<i class="fa fa-times"></i>\t\t\t\t</button>\t\t\t</div>';$(".list-active-filters").show(),$(".list-active-filters").append(c),s(),$(this).closest(".list-column-filters").hide(),r=1,t(r)}else notify("Please select Column Name & Column Operator","error")}),$(".list-column-filters").find('[name="column_name"]').on("change",function(){var t=$(this).find(":selected").val(),e=$(this).find(":selected").data("type"),a=$(this).closest(".list-column-filters"),i=$(a).find(".column-value-container"),o="";o="boolean"==e?'<select class="form-control" name="column_value" data-toggle="tooltip" data-placement="bottom" title="Filter value">\t\t\t\t<option value="1">Yes</option>\t\t\t\t<option value="0">No</option>\t\t\t</select>':"date"==e?'<div class="input-group">\t\t\t\t<span class="input-group-addon">\t\t\t\t\t<i class="fa fa-calendar"></i>\t\t\t\t</span>\t\t\t\t<input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">\t\t\t</div>':"datetime"==e?'<div class="input-group datetimepicker">\t\t\t\t<span class="input-group-addon">\t\t\t\t\t<i class="fa fa-calendar"></i>\t\t\t\t</span>\t\t\t\t<input type="text" name="column_value" class="form-control date" autocomplete="off" data-toggle="tooltip" data-placement="bottom" title="Filter value">\t\t\t</div>':'<input type="text" name="column_value" class="form-control autocomplete" autocomplete="off" data-ac-module="'+c+'" data-ac-field="'+t+'" data-ac-unique="Yes" data-toggle="tooltip" data-placement="bottom" title="Filter value">',$(i).empty().append(o),"date"==e?enableDatepicker():"datetime"==e?enableDateTimepicker():"boolean"!=e&&enableAutocomplete()}),$("body").on("click",".filter-tag .remove-filter",function(e){$(this).tooltip("hide"),$(this).closest(".filter-tag").remove(),t(r)}),$("body").on("click",".origin-pagination a",function(e){e.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&(r=$(this).attr("href").split("page=")[1],t(r))}),$("#import-from-csv").on("click",function(){var t=$(this).attr("title");t||(t=$(this).data("original-title"));var e='<div class="row">\t\t\t<div class="col-md-12">\t\t\t\t<form method="POST" name="import-form" id="import-form" enctype="multipart/form-data">\t\t\t\t\t<div class="row">\t\t\t\t\t\t<div class="col-md-12">\t\t\t\t\t\t\t<div class="form-group text-center">\t\t\t\t\t\t\t\t<label class="control-label">Import File (.csv, .xls, .xlsx)</label><br>\t\t\t\t\t\t\t\t<label title="Upload file" for="import_file" class="btn btn-primary btn-sm">\t\t\t\t\t\t\t\t\t<input type="file" accept=".csv, .xls, .xlsx" name="import_file" id="import_file" class="hide">\t\t\t\t\t\t\t\t\tChange\t\t\t\t\t\t\t\t</label>\t\t\t\t\t\t\t\t<input type="hidden" class="form-control" name="module" value="'+$(this).data("module")+'">\t\t\t\t\t\t\t\t<div id="import-file-name"></div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="row">\t\t\t\t\t\t<div class="col-md-12">\t\t\t\t\t\t\t<div class="import-progress progress progress-sm active" style="display: none;">\t\t\t\t\t\t\t\t<div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t<button type="button" class="btn btn-block btn-primary" id="start-importing">Import</button>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</form>\t\t\t</div>\t\t</div>';msgbox(e,null,t),$("#import_file").on("change",function(){$("#import-file-name").html(document.getElementById("import_file").files[0].name)}),$("#start-importing").on("click",function(){var t=this,e=$(this).closest("#import-form");if($(e).find(".progress").show(),$(t).hide(),document.getElementById("import_file").files[0].name){var a=($(this).button("loading"),new FormData($(e)[0]));$.ajax({url:base_url+"/import_from_csv",type:"POST",data:a,cache:!1,contentType:!1,processData:!1,success:function(a){a.success?location.reload():($(e).find(".progress").hide(),$(t).show(),notify(a.msg,"error"))},error:function(a){$(e).find(".progress").hide(),$(t).show(),notify("Some internal error occured. Please try again...!!!","error")}})}})}),$(window).on("hashchange",function(){if(window.location.hash){var e=window.location.hash.replace("#","");if(e==Number.NaN||e<=0)return!1;t(e)}})});