$(function() {  
	
	 $('#powertg').tree({
		    url:'../../power/getFrameWork.do?getMs='+getMS(),
		    method:'post',
			lines:true,
			checkbox:true,
			cascadeCheck:true,
			  onClick: function(node){
		        	var powerid = $("#poweridd").val(node.id);
		        },
			onContextMenu : function(e,node){
		        e.preventDefault();
		        var powerid = $('#poweridd').val(node.id);
		        $('#powertg').tree('select', node.target);
		    	$('#mmm').menu('show', {
		    		left: e.pageX,
		    		top: e.pageY
		    	});
			}
		});
	 
	//点击确定添加物品类
		$('#powertree .addWindow .quedingadd').click(function(){
			var powerName = $('#powertree .addWindow .powerName').val();
			var powerKey = $('#powertree .addWindow .powerKey').val();
			var power = $("#poweridd").val();
			
			if(powerName == null || powerName == ""){
				windowContol("请输入新增类name");
			}else if(powerKey == null || powerKey == ""){
				windowContol("请输入新增类key");
			}else{
				$.ajax({
					data:{power:power,powerName:powerName,powerKey:powerKey},
					url:"../../power/addUserPower.do?getMs="+getMS(),
					method:"post",
					success: function(data){
						$('#powertg').tree('reload');
						$('#powertree .addWindow').css('display','none');
					}
				})
		}
		})
	 
	 
	 
	 $('#powertree .addWindow .cancel').click(function(){
			$('#powertree .addWindow').css('display','none');
		})
})

function add(){
	$('#powertree .addWindow').css('display','block');
}