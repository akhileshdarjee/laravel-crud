$(document).ready(function(){var t=1,a=!1;function e(t,e){a||$("body").find(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+t,dataType:"json",success:function(t){a=!1;var e=["name","date","size","type","download","delete"],n=t.backups.data,o=$("body").find(".list-view"),d="";Object.keys(n).length>0?$.each(n,function(t,a){d+='<tr class="clickable_row">                            <td class="text-center">'+(parseInt(t)+1)+"</td>",$.each(e,function(t,e){var n=a[e];"download"==e?d+='<td data-field-name="'+e+'">                                    <a href="'+n+'" class="btn btn-success btn-xs" data-toggle="tooltip" data-placement="bottom" title="Download backup">                                        Download                                    </a>                                </td>':"delete"==e?d+='<td data-field-name="'+e+'">                                    <button class="btn btn-danger btn-xs delete-backup" data-toggle="tooltip" data-placement="bottom" title="Delete backup" data-href="'+n+'">                                        Delete                                    </button>                                </td>':"type"==e?"Database"==n?d+='<td data-field-name="'+e+'">                                        <span class="label label-info">'+n+"</span>                                    </td>":"Files"==n?d+='<td data-field-name="'+e+'">                                        <span class="label label-warning">'+n+"</span>                                    </td>":"Database + Files"==n&&(d+='<td data-field-name="'+e+'">                                        <span class="label label-primary">'+n+"</span>                                    </td>"):d+='<td data-field-name="'+e+'">'+n+"</td>"}),d+="</tr>"}):d+='<tr>                        <td colspan="'+(e.length+1)+'" class="no-data">No Backups Found</td>                    </tr>',$(o).find(".list-view-items").empty().append(d),$("body").find("#item-count").html(t.backups.total||"0"),$("body").find("#item-from").html(t.backups.from||"0"),$("body").find("#item-to").html(t.backups.to||"0"),$("body").find(".origin-pagination-content").empty().append(makePagination(t.backups)),$("body").find(".data-loader").hide()},error:function(t){$("body").find(".data-loader").hide(),notify("Some error occured. Please try again","error")}})}e(t),$("body").on("click",".refresh-backups",function(){e(t=1)}),$("body").on("click",".delete-backup",function(){var t=$(this).data("href");msgbox("Sure you want to delete this backup permanently?",'<button type="button" class="btn btn-xs" data-dismiss="modal">No</button>            <button type="button" class="btn btn-danger btn-xs confirm-delete-backup" data-href="'+t+'">Yes</button>')}),$("body").on("click",".confirm-delete-backup",function(){var n=$(this).data("href");$.ajax({type:"POST",url:n,dataType:"json",success:function(n){$("body").find("#message-box").modal("hide"),n.success?(a=!0,e(t)):notify(n.msg,"error")},error:function(t){$("body").find("#message-box").modal("hide"),notify("Some error occured. Please try again","error")}})}),$("body").on("click",".create-backup",function(a){a.preventDefault();var n=$(this).data("href");$("body").find(".data-loader-full").show(),$.ajax({type:"POST",url:n,dataType:"json",success:function(a){$("body").find(".data-loader-full").hide(),a.success?(notify(a.msg,"info"),e(t)):notify(a.msg,"error")},error:function(t){$("body").find(".data-loader-full").hide(),notify("Some error occured. Please try again","error")}})}),$("body").on("click",".origin-pagination a",function(a){a.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&e(t=$(this).attr("href").split("page=")[1])}),$(window).on("hashchange",function(){if(window.location.hash){var t=window.location.hash.replace("#","");if(t==Number.NaN||t<=0)return!1;e(t)}})});