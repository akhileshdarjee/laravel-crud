$(document).ready(function(){function t(t){var i=e();$(".data-loader").show(),$.ajax({type:"GET",url:app_route+"?page="+t,data:i,dataType:"json",success:function(t){var e=t.activities.data,i=t.current_user,a=(t.activities.from,"");$("body").find(".no-data").remove(),e.length>0?($.each(e,function(t,e){var o=!1,n=i.id==e.user_id?"You":e.user,r="<strong>"+n+"</strong>",d=moment(e.created_at).fromNow(),s=moment(e.created_at).format("MMM D, YYYY on hh:mm A");if("Create"==e.action)var c="bg-blue";else if("Update"==e.action)var c="bg-yellow";else if("Delete"==e.action)var c="bg-red";else var c="bg-aqua";if("Auth"==e.module)o="Login"==e.action?r+" logged in":r+" logged out";else{if(e.form_id)var l="<strong>"+e.module+": "+e.form_title+"</strong>";"Create"==e.action?o="New "+l+" created by "+r:"Update"==e.action?o=l+" updated by "+r:"Delete"==e.action&&(o="<strong>"+e.module+": "+e.form_title+"</strong>",o+=" deleted by "+r)}a+='<li>\t\t\t\t\t\t\t<i class="'+e.icon+" "+c+'"></i>\t\t\t\t\t\t\t<div class="timeline-item">\t\t\t\t\t\t\t\t<span class="time">\t\t\t\t\t\t\t\t\t<i class="fa fa-clock-o"></i> '+d+'\t\t\t\t\t\t\t\t</span>\t\t\t\t\t\t\t\t<div class="timeline-body no-border">'+o+'<br />\t\t\t\t\t\t\t\t\t<small class="text-muted">'+s+"</small>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>"}),$(".origin-activities").empty().append(a)):(a='<div class="h4 text-center no-data"><strong>No Data</strong></div>',$(".origin-activities").empty(),$(".origin-activities").after(a)),$(".data-loader").hide(),$("#item-count").html(t.activities.total||"0"),$("#item-from").html(t.activities.from||"0"),$("#item-to").html(t.activities.to||"0"),$(".origin-pagination-content").empty().append(makePagination(t.activities))},error:function(t){notify(JSON.parse(t.responseText).message,"error"),$(".data-loader").hide()}})}function e(){var t={},e={},i=$("body").find('[name="owner"]').val(),a=$("body").find('[name="action"]').val(),o=$("body").find('[name="module"]').val();return(i||a||o)&&(i&&(e.owner=i),a&&(e.action=a),o&&(e.module=o),t.filters=e),t}var i=1;t(i),$(".refresh-activity").on("click",function(){i=1,t(i)}),$("body").on("change",".activity-filter",function(e){i=1,t(i)}),$("body").on("click",".origin-pagination a",function(e){e.preventDefault(),"#"!=$(this).attr("href")&&$(this).attr("href").indexOf("page=")>=0&&(i=$(this).attr("href").split("page=")[1],t(i))}),$(window).on("hashchange",function(){if(window.location.hash){var e=window.location.hash.replace("#","");if(e==Number.NaN||e<=0)return!1;t(e)}})});