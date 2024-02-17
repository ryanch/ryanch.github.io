var app = {};


app.navItems = [
    {name:"Read",  "url":"./puzzle1/index.html" },
    {name:"Launch",  "url":"./puzzle2/index.html" },
    {name:"Watch",  "url":"./puzzle3/index.html" },
    {name:"Puzzle",  "url":"./puzzle4/index.html" },
    {name:"Solve",  "url":"./puzzle5/index.html" },
    {name:"View",  "url":"./puzzle6/index.html" },
    {name:"Listen",  "url":"./puzzle7/index.html" },
    {name:"Observe",  "url":"./puzzle8/index.html" },
    {name:"Combine",  "url":"./puzzle9/index.html" },
];


app.printTopNav = function(base) {

    var s = "";
    s+= "<div class=\"nav-scroller py-1 mb-2\">";
    s+= "<nav class=\"nav d-flex justify-content-between\">";

    for (var i = 0; i < app.navItems.length; i++ ) {
        var item = app.navItems[i];
        s+= "<a class=\"p-2 text-muted\" href=\""+base+item.url+"\">"+item.name+"</a>";
    }

    s+= "</nav>";
    s+= "</div>";

    document.write(s);
}

app.checkAnswer = function(answer, puzzleNumber) {

    if (!answer) return false;

    var hash = app.makeHash(answer);
    var puzzleHashLookup = {
        "ff4aea4f869394f2444b9a5b4727ea5c-2": true,
        "30098931afc7460c67db616b477179b8-1": true,
        "deafca35b068ab4cdd12f5a59652bc18-6": true,
        "d78bace1594084f29a9dbd3469fed2cb-5": true,
        "6483f99877a46161a0dfcc4ab6c4479b-7": true,
        "bcef32f6887a0f77318d70a86d7e2a09-4": true,
        "f0f35ce6b460101d386f13741da64ae0-3": true,
        "fc98a865c2415fd5b6edb3780af6312c-8": true,
        "073e6c090297c0f474e7a31ff70c470f-8": true
    };
    return puzzleHashLookup[hash + "-" + puzzleNumber]===true;
}



app.makeHash = function(ans) {

    ans = ans.replaceAll(/\s/g,'');
    ans = ans.toLowerCase();
    ans = ans + ans + ans + ans + ans + ans + ans + ans;

    var padding = [
        "zzz9d8as98fghgfda90-=0-=8sd90a8s90d8asjda9sud91291hasuih0-=-0daskhd2813891238jhasjkdhasdas",
        "9asdasd12312d8as98dafghgfh90-=8sd900-=aasdasd8s90d812321asjda9sud91291hasuihdaskhd2813891238jhasjkdhasdas",
        "9cvxcvsdfsdd8as98dfASDIOASDIOSADgha98sd90a8s900-=-0d8asjda9sud9129112321h-0=0IOIOOIO-asuihdaskhd280-=0-13891238jhasjkdhasdas",
        "923213d8aASDSAs98da98sd9asdfghfgas0a8s90UUAIUDIASUIDUASd8asjda9sud91291ha123213suihdaskhd2813891238jhasjkdhasdas",
        "sdfds9d8as98da98sd90a8s90d8asjda90-=sud912910-=-0hasuihdask12321hd2813891238jhasjkdhasdas",
        "9ssdfdsfASDASDsdfsdfdsdASDASDASD8as98dasdsaa98sd90a80-=-0s9fghgfh0d8asjda9sud91291hasuihd1OIOIOIOIO2321askhd2813891238jhasjkdhasdas",
        "9dsdfds8as98da9fghgf8sfghfgd90a8s90d8asjda9sud9129fgh1hasuihd0-=askh12321d2813891238jhasjkdhasdas",
        "9d8as98da98fghgfsd90a8s90d8asjda9sud91291hasuasds12321aihdaskhd2810-=389120-=-0=38jhasjkdhasdas",
        "9dsdfds8ahffghfgghgfs98da98sd90a8s90d8asjda9sud91291231231hasuihdaskhd2813891238jhasjkdhasdas",
        "9d8asJHJHJKHU98dafghfg98sd90123213a8s0-=90d8asjda9sud91291hasuihdaas0-=-0dasdskhd2813891238jhasjkdhasdas",
        "9d8as98da9fgh8sd90a0-=-0812312sfghgfh90d8asjda9sud91291hasuihdaskhd2813891238jhasjkdhasdas",
        "9d8aAA98da98fghfg0-=-0=sd90a1231230-=-018s90d8asjda9sud91291hasuihdaskhd2813891238jhasjkdhasdas",
        "9dsz34348as98da98sfghgfd90a8s90d8aDASSDASDSADsjdfghfga9sud91212312391hasuihdaskhd280-=13891238jhasjkdhasdas",
        "9d23423426563zxcxz8as98da9fghfg8sfghfgd90a8s90dfghgf8asdasasjda9sud90-=0-1291hasuihd12fghgf312askhd2812312313891238jhasjkdhasdas",
        "9d13d2342348as98da9fghgf0-=-08sd90a8s90d8asjda9sud9129LKLIUIOUIOUIO1ha24121312s0-=0-uihdaskhd2813891238jhasjkdhasdas",
        "9dzxczx8as98da98sd90aasdsa8s90d8asjda9sud91291hasuihdaskhd2813891238jhasjkdhasdas",
    ];

    ans = ans + padding[app.hashCode(ans)%padding.length];
    ans = ans + padding[app.hashCode(ans)%padding.length];
    ans = ans + padding[app.hashCode(ans)%padding.length];
    ans = ans + padding[app.hashCode(ans)%padding.length];

    return app.md5(ans);
}


app.hashCode = function(string){
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var code = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+code;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}


app.md5 = function(inputString) {
    var hc="0123456789abcdef";
    function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
    function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
    function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
    function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
    function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
    function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
    function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
    function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
    function sb(x) {
        var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
        for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
        blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
    }
    var i,x=sb(""+inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
    for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
        a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
        b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
        c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
        d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
        b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
        c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
        d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
        a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
        b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
        c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
        d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
        a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
        b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
        c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
        d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
        a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
        b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
        c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
        d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
        a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
        b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
    }
    return rh(a)+rh(b)+rh(c)+rh(d);
}


app.buildPuzzleAnswerInputBlock = function (puzzleNum) {

    s = "";
    s +=      '<p>';
    s +=      '<input type="text" id="puzzle'+puzzleNum+'Input" onkeydown="if (event.key == \'Enter\'){app.handleSubmitAnswer( '+puzzleNum+' )}else{}" /> <input type="button" value="Submit Answer" onclick="app.handleSubmitAnswer( '+puzzleNum+' )" />';
    s +=      '<span id="puzzle'+puzzleNum+'Output"></span>';
    s +=      '</p>';
    return s;

}

app.printPuzzleAnswerInputBlock = function (puzzleNum) {
    document.write( app.buildPuzzleAnswerInputBlock( puzzleNum ) );
}


app.printPuzzleBlock = function (puzzleNum, title, desc) {

    s = "";



    s +='<div class="col-md-6">'
    s +='<div class="card flex-md-row mb-4 box-shadow h-md-250">';
    s +=  '<div class="card-body d-flex flex-column align-items-start">';
    s +=    '<strong class="d-inline-block mb-2  puzzle'+puzzleNum+'_color" ><a href="./puzzle'+puzzleNum+'/index.html"  class="puzzle'+puzzleNum+'_color">Puzzle '+puzzleNum+'</a></strong>';
    s +=    '<h3 class="mb-0">';
    s +=      '<a class="text-dark" href="./puzzle'+puzzleNum+'/index.html">"'+title+'"</a>';
    s +=    '</h3>';
    s +=    '<p class="card-text mb-auto">';
    s +=    desc;
    s += app.buildPuzzleAnswerInputBlock( puzzleNum );
    //s +=      '<p>';
    //s +=      '<input type="text" id="puzzle'+puzzleNum+'Input" onkeydown="if (event.key == \'Enter\'){app.handleSubmitAnswer( '+puzzleNum+' )}else{}" /> <input type="button" value="Submit Answer" onclick="app.handleSubmitAnswer( '+puzzleNum+' )" />';
    //s +=      '<span id="puzzle'+puzzleNum+'Output"></span>';
    //s +=      '</p>';
    s +=    '</p>';
    s +=    '<a href="./puzzle'+puzzleNum+'/index.html">Open Puzzle</a>';
    s +=  '</div>';
    s +=      '<a class="text-dark" href="./puzzle'+puzzleNum+'/index.html">';
    s +=  '<img class="card-img-right flex-auto d-none d-md-block" src="assets/puzzle-'+puzzleNum+'-thumb.png" style="width: 100px; height: 250px;" />';
    s +=     '</a>';
    s +='</div>';
    s +='</div>';
    
  document.write(s);

}



app.storeValue = function(key, value) {
    localStorage.setItem(key, value);
}

app.getStoredValue = function(key, defaultValue) {
    var value = localStorage.getItem(key);
    if (value === undefined || value == null) {
        return defaultValue;
    }
    return value;
}


app.handleSubmitAnswer = function (puzzleNum) {

    var input = document.getElementById("puzzle" + puzzleNum + "Input");
    var output = document.getElementById("puzzle" + puzzleNum + "Output");

    var answer = input.value;

    if ( app.checkAnswer(answer,puzzleNum) ) {
        output.innerHTML = "<span class=\"text-success\"> Correct!</span>";
    }
    else {
        output.innerHTML = "<span class=\"text-fail\"> Wrong!</span>";
    }


    app.saveAnswer(puzzleNum, answer);

}

app.saveAnswer = function(puzzleNum, answer) {
    app.storeValue( "ans-" + puzzleNum, answer );
}


app.loadStoredAnswers = function() {

    for (var i = 0; i< 9; i++) {
        var puzzleNum = i+1;
        var fieldName = 'puzzle'+puzzleNum+'Input';
        var field = document.getElementById(fieldName);
        if (field==null) continue;

        var answerKey = "ans-" + puzzleNum;

        var savedValue = app.getStoredValue(answerKey,"");
        if (savedValue == "") continue;

        field.value = savedValue;
        app.handleSubmitAnswer(puzzleNum);
    }


}

app.pageLoaded = function() {
    app.loadStoredAnswers();
}


app.buildSubmission = function() {
    var s = "";
    
    s+= "Team members: " + document.getElementById("teamMembers").value + "\n\n";

    s += "PUZZLE ANSWERS\n\n";
    for (var i = 0; i< 8; i++) {
        var puzzleNum = i+1;
        var answerKey = "ans-" + puzzleNum;
        var storedAnswer = app.getStoredValue(answerKey,"");
        s += "Puzzle " + puzzleNum + ": " + storedAnswer;
        s += "\n";
    }
    return s;
}


app.populateSubmission = function() {
    document.getElementById("generatedResponseArea").value = app.buildSubmission();
}

app.copyResponse = function() {
    var copyText = document.getElementById("generatedResponseArea");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}
