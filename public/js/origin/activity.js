$(document).ready(function(){var e=1;function t(e){var t=function(){var e={},t={},i=$("body").find('[name="owner"]').val(),a=$("body").find('[name="action"]').val(),o=$("body").find('[name="module"]').val();(i||a||o)&&(i&&(t.owner=i),a&&(t.action=a),o&&(t.module=o),e.filters=t);return e}();$("body").find(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+e,data:t,dataType:"json",success:function(e){var t=e.activities.data,i=e.current_user,a=(e.activities.from,"");if($("body").find(".dataTables_empty").remove(),t.length>0)$.each(t,function(e,t){var o=!1,n="<strong>"+(i.id==t.user_id?"You":t.user)+"</strong>",d=moment.utc(t.created_at).fromNow(),r=moment.utc(t.created_at).local().format("MMM D, YYYY on hh:mm A");if("Create"==t.action)var s="bg-green";else if("Update"==t.action)s="bg-yellow";else if("Delete"==t.action)s="bg-red";else if("Auth"==t.module)s="bg-blue";else s="bg-purple";if("Auth"==t.module)o="Login"==t.action?n+" logged in":n+" logged out";else{var l="<strong>"+t.module+": "+t.form_title+"</strong>";"Create"==t.action?o="New "+l+" created by "+n:"Update"==t.action?o=l+" updated by "+n:"Delete"==t.action?(o="<strong>"+t.module+": "+t.form_title+"</strong>",o+=" deleted by "+n):"Download"==t.action&&(o="Report"==t.module?"<strong>"+t.form_title+"</strong> was downloaded by "+n:l+" was downloaded by "+n)}a+='<div>                            <i class="'+t.icon+" "+s+'"></i>                            <div class="timeline-item">                                <span class="time">                                    <i class="fas fa-clock"></i> '+d+'                                </span>                                <div class="timeline-body">'+o+'<br />                                    <small class="text-muted">'+r+"</small>                                </div>                            </div>                        </div>"}),$("body").find(".list-actions").show(),$("body").find(".origin-activities").empty().append(a),$("body").find(".item-count").html(e.activities.total||"0"),$("body").find(".item-from").html(e.activities.from||"0"),$("body").find(".item-to").html(e.activities.to||"0"),$("body").find(".origin-pagination-content").empty().append(makePagination(e.activities));else{var o='<div class="dataTables_empty">'+getNoResults()+"</div>";$("body").find(".origin-activities").empty(),$("body").find(".origin-activities").after(o),$("body").find(".list-actions").hide()}$("body").find(".data-loader").hide()},error:function(e){if(void 0!==JSON.parse(e.responseText).message)var t=JSON.parse(e.responseText).message;else t="Some error occured. Please try again";notify(t,"error"),$("body").find(".data-loader").hide()}})}t(e),$("body").on("click",".refresh-activity",function(){t(e=1)}),$("body").on("change",".activity-filter",function(i){t(e=1)}),$("body").on("click",".origin-pagination a",function(i){i.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&t(e=$(this).attr("href").split("page=")[1])}),$(window).on("hashchange",function(){if(window.location.hash){var e=window.location.hash.replace("#","");if(e==Number.NaN||e<=0)return!1;t(e)}})});
