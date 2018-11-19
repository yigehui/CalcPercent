	$(function(){
	//alert(getNum('零'));
	
	
	$('#calc').click(function(){
	var text = $('#baseData').val();
	var list = text.match(/[^，,：]{1,2}香(.?斤)?(.?两)?(.?钱)?(.?分)?/g);
	if(list==null){
	$('#value').val("没有匹配到相应字段");
	return false;
	}
	
	
	var arrayObj = new Array();　
	$.each(list,function(index,element){
		if(element.indexOf("斤")==-1 && element.indexOf("分")== -1&&element.indexOf("两")==-1 && element.indexOf("钱")== -1){
		return;
		}
		//var thisValue = element.split("香")[1];
		arrayObj.push(element);
	});
	var listNum = new Array();　
	var totalNum = calcTotal(arrayObj,listNum);
	$('#value').empty();
	$('#value').val(getText(arrayObj,listNum,totalNum));
	
	});



	});
	
	
	function getText(list,listNum,totalNum){
	var string = "";
	$.each(list,function(index,element){
	
		string += element +" 分数："+listNum[index]+ "分，百分比：" +  (listNum[index]/totalNum*100).toFixed(2) + "%\n";
	})
	string += "总钱数为："+totalNum +"分";
	return string;
	}
	
	function calcTotal(val,listNum){
	var total = 0;
	$.each(val,function(index,element){
		//计算总分数
		var nums = (element.split("香")[1]);
		var thisValue = 0;
		thisValue = getLevelNum(nums,0,thisValue);
		listNum.push(thisValue);
		total +=thisValue
	})
	
	return total;
	}
	
	var qian = new Array();
	qian.push("斤");
	qian.push("两");
	qian.push("钱");
	qian.push("分");
	
	//递归算总分数
	function getLevelNum(val,i,thisValue){
		var splitValue = val.split(qian[i]);
		if(splitValue.length>1){
			thisValue=(thisValue)*16+getNum(splitValue[0])
			splitValue = splitValue[1];
		}else{
			thisValue = thisValue*16
			splitValue = splitValue[0];
		}
	
		if(i==qian.length-1){
			 return thisValue;
		}
		return getLevelNum(splitValue,i+1,thisValue);
		 
	}
	
	
	
	function getNum(chinese){
		var toNum ={
		'':0, 
		'一':1, 
		'二':2, 
		'三':3, 
		'四':4, 
		'五':5, 
		'六':6,
		'七':7, 
		'八':8, 
		'九':9, 
		'十':10
		}
		return toNum[chinese];
		
	}
	function getFen(value){

		 var getLiang  = value[0];
		 var getQian  =  value[1];
		 
		 return (getLiang*16+getQian);
	}
	