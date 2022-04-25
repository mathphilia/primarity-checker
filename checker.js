function pow(a,b,mod){
    let ans=1n;
    while(0<b){
        if(b&1n){
            ans=ans*a%mod;
        }
        a=a*a%mod;
        b/=2n;
    }
    return ans;
}

function Miller(n,base){
    switch((pow(base,(n-1n)/2n,n)+1n)%n){
        case 0n:
            return true;
        case 2n:
            return true;
        default:
            return false;
    }
}

function getRandomInteger(n){
    let ans=BigInt(Math.floor(Math.random()*0x100000000));
    if(ans%n==0){
        return getRandomInteger(n);
    }else{
        return ans;
    }
}
function isPrime(n){
    if(n==2){
        return true;
    }
    if(n<2||(n&1n)==0n){
        return false;
    }
    let base;
    for(let i=0;i<20;i++){
        base=getRandomInteger(n);
        if(!Miller(n,base)){
            return false;
        }
    }
    return true;
}

function primalityCheck(event){
    if(number.value==''){
        result.innerHTML='整数を入力してください';
        result.style.color='red';
        return;
    }
    try{
        ipt=BigInt(number.value);
    }catch{
        result.innerHTML='整数を入力してください';
        result.style.color='red';
        return;
    }
    if(isPrime(ipt)){
        result.innerHTML=ipt.toString()+'はほぼ間違いなく素数です';
	result.style.color='black';
    }else{
        result.innerHTML=ipt.toString()+'は素数ではありません';
        if(ipt==57n){
            result.innerHTML+='<br><span style="color: red;">※57は実際には素数ですが、Miller-Rabin法では素数でないと判定されます。<br>詳しくは<a href="https://ja.ansaikuropedia.org/wiki/素数\">こちら</a>を参照してください。</span>'
        }
	result.style.color='black';
    }
}

let number=document.getElementById('number');
let result=document.getElementById('result');
let button=document.getElementById('button')
number.onchange=primalityCheck;
button.onclick=primalityCheck;
