$(document).ready(function(){var t=1;function i(t){var i=function(){var t={},i={},e=$("body").find('[name="owner"]').val(),o=$("body").find('[name="action"]').val(),a=$("body").find('[name="module"]').val();(e||o||a)&&(e&&(i.owner=e),o&&(i.action=o),a&&(i.module=a),t.filters=i);return t}();$("body").find(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+t,data:i,dataType:"json",success:function(t){var i=t.activities.data,e=t.current_user,o=(t.activities.from,"");$("body").find(".no-data").remove(),i.length>0?($.each(i,function(t,i){var a=!1,n="<strong>"+(e.id==i.user_id?"You":i.user)+"</strong>",d=moment(i.created_at).fromNow(),r=moment(i.created_at).format("MMM D, YYYY on hh:mm A");if("Create"==i.action)var c="bg-blue";else if("Update"==i.action)c="bg-yellow";else if("Delete"==i.action)c="bg-red";else c="bg-aqua";if("Auth"==i.module)a="Login"==i.action?n+" logged in":n+" logged out";else{if(i.form_id)var l="<strong>"+i.module+": "+i.form_title+"</strong>";"Create"==i.action?a="New "+l+" created by "+n:"Update"==i.action?a=l+" updated by "+n:"Delete"==i.action?(a="<strong>"+i.module+": "+i.form_title+"</strong>",a+=" deleted by "+n):"Download"==i.action&&(a="Report"==i.module?"<strong>"+i.form_title+"</strong> was downloaded by "+n:l+" was downloaded by "+n)}o+='<li>                            <i class="'+i.icon+" "+c+'"></i>                            <div class="timeline-item">                                <span class="time">                                    <i class="fa fa-clock-o"></i> '+d+'                                </span>                                <div class="timeline-body no-border">'+a+'<br />                                    <small class="text-muted">'+r+"</small>                                </div>                            </div>                        </div>"}),$("body").find(".origin-activities").empty().append(o)):(o='<div class="h4 text-center no-data"><strong>No Data</strong></div>',$("body").find(".origin-activities").empty(),$("body").find(".origin-activities").after(o)),$("body").find(".data-loader").hide(),$("body").find("#item-count").html(t.activities.total||"0"),$("body").find("#item-from").html(t.activities.from||"0"),$("body").find("#item-to").html(t.activities.to||"0"),$("body").find(".origin-pagination-content").empty().append(makePagination(t.activities))},error:function(t){notify("Some error occured. Please try again","error"),$("body").find(".data-loader").hide()}})}i(t),$("body").on("click",".refresh-activity",function(){i(t=1)}),$("body").on("change",".activity-filter",function(e){i(t=1)}),$("body").on("click",".origin-pagination a",function(e){e.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&i(t=$(this).attr("href").split("page=")[1])}),$(window).on("hashchange",function(){if(window.location.hash){var t=window.location.hash.replace("#","");if(t==Number.NaN||t<=0)return!1;i(t)}})});
