$(function(){
	$('#vote').css('height',$('#loadarea').height()-31);
	//投票
	$('#vote .voteArea .voteBtn').click(function(){
		var voteItemId = $('#vote .voteArea .radioArea input[type=radio]:checked').val();
		var voteId = $('#vote .voteArea .radioArea input[type=radio]:checked').attr('name');
		$.ajax({
			data:{voteItemId:voteItemId,voteId:voteId},
			url:"../../vote/doVote.do?getMs="+getMS(),
			success:function(data){
				if(data == 200){
					windowControl('投票成功');
				}else{
					windowControl('投票失败');	
				}
				loadVote();
			},
			error:function(err){
				windowControl('网络异常');	
			}
		});
	});
});
//设置voteContainer 的宽度
$('#vote #voteContainer').css('width',$('#vote').width()*.91-360);
//加载数据
loadVote();
function loadVote(){
	$.ajax({
		data:{voteId:toVote},
		url:"../../vote/queryVoteDetail.do?getMs="+getMS(),
		success:function(data){
			data =$.parseJSON(data);
			var dataInfo = [];
			var info;
			var status;
			var str;
			var radioStr = '';
			for(var i=0;i<data.list.length;i++){
				radioStr += '<input name="'+data.voteId+'" value="'+data.list[i].voteItemId+'"  type="radio"/>';
				radioStr += data.list[i].voteItemName;
				radioStr += '<span class="space"></span>'
				info = {
					name: data.list[i].voteItemName,
					y:data.list[i].voteItemNumber
				}
				dataInfo.push(info);
			}
			var voteChart = new Highcharts.Chart('voteContainer', {
				chart:{
					type: 'column'
				},
			    title: {
			        text: data.voteName
			    },
			    subtitle: {
			        text: '数据来源: 数据库'
			    },
			    xAxis: {
			        type: 'category'
			    },
			    yAxis: {
			        title: {
			            text: '投票的人数'
			        },
			        allowDecimals:false 
			    },
			    legend: {
			    	enabled: false
			    },
			    plotOptions: {
		            series: {
		                borderWidth: 0,
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.y:f}'
		                }
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
		            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:f}</b><br/>'
		        },
		        series: [{
		            name: '投票选项',
		            colorByPoint: true,
		            data:dataInfo,
		        }]
			});
			if(would){
				$('#vote .voteArea .radioArea').html(radioStr);
			}else{
				$('#vote .voteArea').hide();
			}
			$('#vote .dataArea .detail').text(data.detail);
			$('#vote .dataArea .chores .amount').text(data.amount);
			if(data.status == 0){
				status = "关闭";
				str = '<span class="red"></span>';
			}else if(data.status == 1){
				status = "投票中";
				str = '<span class="green"></span>';
			}else{
				status = "已结束";
				str = '<span class="red"></span>';
			}
			$('#vote .dataArea .chores').append(str);
			$('#vote .dataArea .chores .status').text(status);
		},
		error:function(err){
			windowControl('网络异常');
		}
	});
}