module.exports = function(scopeChars){
    return function(str){
        var reg = /['"]@include\s*(\w+)\s*['"]/g;
        return str.replace(reg,function(s,attr){
            return  `var ${attr} = ${scopeChars}.${attr}`;
        })
    }
}

