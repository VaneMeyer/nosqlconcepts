import ace from 'ace-builds/src-noconflict/ace'

ace.define("ace/mode/matching_brace_outdent",[], function(require, exports, module){"use strict";
var Range = require("../range").Range;
var MatchingBraceOutdent = function () { };
(function () {
    this.checkOutdent = function (line, input) {
        if (!/^\s+$/.test(line))
            return false;
        return /^\s*\}/.test(input);
    };
    this.autoOutdent = function (doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);
        if (!match)
            return 0;
        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({ row: row, column: column });
        if (!openBracePos || openBracePos.row == row)
            return 0;
        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column - 1), indent);
    };
    this.$getIndent = function (line) {
        return line.match(/^\s*/)[0];
    };
}).call(MatchingBraceOutdent.prototype);
exports.MatchingBraceOutdent = MatchingBraceOutdent;

});

ace.define("ace/mode/json_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JsonHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "variable", // single line
                regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
            }, {
                token: "string", // single line
                regex: '"',
                next: "string"
            }, {
                token: "constant.numeric", // hex
                regex: "0[xX][0-9a-fA-F]+\\b"
            }, {
                token: "constant.numeric", // float
                regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token: "constant.language.boolean",
                regex: "(?:true|false)\\b"
            }, {
                token: "text", // single quoted strings are not allowed
                regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token: "comment", // comments are not allowed, but who cares?
                regex: "\\/\\/.*$"
            }, {
                token: "comment.start", // comments are not allowed, but who cares?
                regex: "\\/\\*",
                next: "comment"
            }, {
                token: "paren.lparen",
                regex: "[[({]"
            }, {
                token: "paren.rparen",
                regex: "[\\])}]"
            }, {
                token: "punctuation.operator",
                regex: /[,]/
            }, {
                token: "text",
                regex: "\\s+"
            }
        ],
        "string": [
            {
                token: "constant.language.escape",
                regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }
        ],
        "comment": [
            {
                token: "comment.end", // comments are not allowed, but who cares?
                regex: "\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };
};
oop.inherits(JsonHighlightRules, TextHighlightRules);
exports.JsonHighlightRules = JsonHighlightRules;

});

ace.define("ace/mode/json5_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var JsonHighlightRules = require("./json_highlight_rules").JsonHighlightRules;
var Json5HighlightRules = function () {
    JsonHighlightRules.call(this);
    var startRules = [{
            token: "variable",
            regex: /[a-zA-Z$_\u00a1-\uffff][\w$\u00a1-\uffff]*\s*(?=:)/
        }, {
            token: "variable",
            regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']\s*(?=:)/
        }, {
            token: "constant.language.boolean",
            regex: /(?:null)\b/
        }, {
            token: "string",
            regex: /'/,
            next: [{
                    token: "constant.language.escape",
                    regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
                    consumeLineEnd: true
                }, {
                    token: "string",
                    regex: /'|$/,
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
        }, {
            token: "string",
            regex: /"(?![^"]*":)/,
            next: [{
                    token: "constant.language.escape",
                    regex: /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\/bfnrt]|$)/,
                    consumeLineEnd: true
                }, {
                    token: "string",
                    regex: /"|$/,
                    next: "start"
                }, {
                    defaultToken: "string"
                }]
        }, {
            token: "constant.numeric",
            regex: /[+-]?(?:Infinity|NaN)\b/
        }];
    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);
    this.normalizeRules();
};
oop.inherits(Json5HighlightRules, JsonHighlightRules);
exports.Json5HighlightRules = Json5HighlightRules;

});

ace.define("ace/mode/jsdoc_comment_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JsDocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: ["comment.doc.tag", "comment.doc.text", "lparen.doc"],
                regex: "(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: ["rparen.doc", "text.doc", "variable.parameter.doc", "lparen.doc", "variable.parameter.doc", "rparen.doc"],
                        regex: /(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.]+)(\])))/,
                        next: "pop"
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text.doc"
                    }
                ]
            }, {
                token: ["comment.doc.tag", "text.doc", "lparen.doc"],
                regex: "(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|"
                    + "implements|external|exception|throws|enum|define|extends))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text.doc"
                    }
                ]
            }, {
                token: ["comment.doc.tag", "text.doc", "variable.parameter.doc"],
                regex: "(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|"
                    + "requires|param|implements|function|extends|typedef|mixes|constructor|var|"
                    + "memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|"
                    + "throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#\.:\/~\"\\-]*)?"
            }, {
                token: ["comment.doc.tag", "text.doc", "variable.parameter.doc"],
                regex: "(@method)(\\s+)(\\w[\\w\.\\(\\)]*)"
            }, {
                token: "comment.doc.tag",
                regex: "@access\\s+(?:private|public|protected)"
            }, {
                token: "comment.doc.tag",
                regex: "@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"
            }, {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            },
            JsDocCommentHighlightRules.getTagRule(),
            {
                defaultToken: "comment.doc",
                caseInsensitive: true
            }
        ],
        "doc-syntax": [{
                token: "operator.doc",
                regex: /[|:]/
            }, {
                token: "paren.doc",
                regex: /[\[\]]/
            }]
    };
    this.normalizeRules();
};
oop.inherits(JsDocCommentHighlightRules, TextHighlightRules);
JsDocCommentHighlightRules.getTagRule = function (start) {
    return {
        token: "comment.doc.tag.storage.type",
        regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};
JsDocCommentHighlightRules.getStartRule = function (start) {
    return {
        token: "comment.doc", // doc comment
        regex: "\\/\\*(?=\\*)",
        next: start
    };
};
JsDocCommentHighlightRules.getEndRule = function (start) {
    return {
        token: "comment.doc", // closing comment
        regex: "\\*\\/",
        next: start
    };
};
exports.JsDocCommentHighlightRules = JsDocCommentHighlightRules;

});

ace.define("ace/mode/javascript_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";
var JavaScriptHighlightRules = function (options) {
    var keywords = {
        "variable.language": "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|" + // Constructors
            "Namespace|QName|XML|XMLList|" + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|" +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" + // Errors
            "SyntaxError|TypeError|URIError|" +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|" +
            "JSON|Math|" + // Other
            "this|arguments|prototype|window|document", // Pseudo
        "keyword": "const|yield|import|get|set|async|await|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|" +
            "if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor",
        "storage.type": "const|let|var|function",
        "constant.language": "null|Infinity|NaN|undefined",
        "support.function": "alert",
        "constant.language.boolean": "true|false"
    };
    var keywordMapper = this.createKeywordMapper(keywords, "identifier");
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";
    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "u{[0-9a-fA-F]{1,6}}|" + // es6 unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-7][0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";
    var anonymousFunctionRe = "(function)(\\s*)(\\*?)";
    var functionCallStartRule = {
        token: ["identifier", "text", "paren.lparen"],
        regex: "(\\b(?!" + Object.values(keywords).join("|") + "\\b)" + identifierRe + ")(\\s*)(\\()"
    };
    this.$rules = {
        "no_regex": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("no_regex"),
            functionCallStartRule,
            {
                token: "string",
                regex: "'(?=.)",
                next: "qstring"
            }, {
                token: "string",
                regex: '"(?=.)',
                next: "qqstring"
            }, {
                token: "constant.numeric", // hexadecimal, octal and binary
                regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token: "constant.numeric", // decimal integers and floats
                regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }, {
                token: [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\s*)(=)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "storage.type", "text", "storage.type", "text", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(" + identifierRe + ")(\\s*)(:)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "text", "text", "storage.type", "text", "storage.type", "text", "paren.lparen"
                ],
                regex: "(:)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: "keyword",
                regex: "from(?=\\s*('|\"))"
            }, {
                token: "keyword",
                regex: "(?:" + kwBeforeRe + ")\\b",
                next: "start"
            }, {
                token: "support.constant",
                regex: /that\b/
            }, {
                token: ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex: /(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/
            }, {
                token: keywordMapper,
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: /[.](?![.])/,
                next: "property"
            }, {
                token: "storage.type",
                regex: /=>/,
                next: "start"
            }, {
                token: "keyword.operator",
                regex: /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                next: "start"
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/,
                next: "start"
            }, {
                token: "paren.lparen",
                regex: /[\[({]/,
                next: "start"
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            }, {
                token: "comment",
                regex: /^#!.*$/
            }
        ],
        property: [{
                token: "text",
                regex: "\\s+"
            }, {
                token: "keyword.operator",
                regex: /=/
            }, {
                token: [
                    "storage.type", "text", "storage.type", "text", "paren.lparen"
                ],
                regex: anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: [
                    "storage.type", "text", "storage.type", "text", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token: "punctuation.operator",
                regex: /[.](?![.])/
            }, {
                token: "support.function",
                regex: "prototype"
            }, {
                token: "support.function",
                regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
            }, {
                token: "support.function.dom",
                regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token: "support.constant",
                regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token: "identifier",
                regex: identifierRe
            }, {
                regex: "",
                token: "empty",
                next: "no_regex"
            }
        ],
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("start"),
            {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token: "text",
                regex: "\\s+|^$",
                next: "start"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "regex": [
            {
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "string.regexp",
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                token: "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {
                token: "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token: "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "default_parameter": [
            {
                token: "string",
                regex: "'(?=.)",
                push: [
                    {
                        token: "string",
                        regex: "'|$",
                        next: "pop"
                    }, {
                        include: "qstring"
                    }
                ]
            }, {
                token: "string",
                regex: '"(?=.)',
                push: [
                    {
                        token: "string",
                        regex: '"|$',
                        next: "pop"
                    }, {
                        include: "qqstring"
                    }
                ]
            }, {
                token: "constant.language",
                regex: "null|Infinity|NaN|undefined"
            }, {
                token: "constant.numeric", // hexadecimal, octal and binary
                regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token: "constant.numeric", // decimal integers and floats
                regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }, {
                token: "punctuation.operator",
                regex: ",",
                next: "function_arguments"
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "function_arguments": [
            comments("function_arguments"),
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: ","
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "qqstring": [
            {
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                consumeLineEnd: true
            }, {
                token: "string",
                regex: '"|$',
                next: "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring": [
            {
                token: "constant.language.escape",
                regex: escapedRe
            }, {
                token: "string",
                regex: "\\\\$",
                consumeLineEnd: true
            }, {
                token: "string",
                regex: "'|$",
                next: "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };
    if (!options || !options.noES6) {
        this.$rules.no_regex.unshift({
            regex: "[{}]", onMatch: function (val, state, stack) {
                this.next = val == "{" ? this.nextState : "";
                if (val == "{" && stack.length) {
                    stack.unshift("start", state);
                }
                else if (val == "}" && stack.length) {
                    stack.shift();
                    this.next = stack.shift();
                    if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1)
                        return "paren.quasi.end";
                }
                return val == "{" ? "paren.lparen" : "paren.rparen";
            },
            nextState: "start"
        }, {
            token: "string.quasi.start",
            regex: /`/,
            push: [{
                    token: "constant.language.escape",
                    regex: escapedRe
                }, {
                    token: "paren.quasi.start",
                    regex: /\${/,
                    push: "start"
                }, {
                    token: "string.quasi.end",
                    regex: /`/,
                    next: "pop"
                }, {
                    defaultToken: "string.quasi"
                }]
        }, {
            token: ["variable.parameter", "text"],
            regex: "(" + identifierRe + ")(\\s*)(?=\\=>)"
        }, {
            token: "paren.lparen",
            regex: "(\\()(?=[^\\(]+\\s*=>)",
            next: "function_arguments"
        }, {
            token: "variable.language",
            regex: "(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"
        });
        this.$rules["function_arguments"].unshift({
            token: "keyword.operator",
            regex: "=",
            next: "default_parameter"
        }, {
            token: "keyword.operator",
            regex: "\\.{3}"
        });
        this.$rules["property"].unshift({
            token: "support.function",
            regex: "(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|"
                + "finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"
        }, {
            token: "constant.language",
            regex: "(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"
        });
        if (!options || options.jsx != false)
            JSX.call(this);
    }
    this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("no_regex")]);
    this.normalizeRules();
};
oop.inherits(JavaScriptHighlightRules, TextHighlightRules);
function JSX() {
    var tagRegex = identifierRe.replace("\\d", "\\d\\-");
    var jsxTag = {
        onMatch: function (val, state, stack) {
            var offset = val.charAt(1) == "/" ? 2 : 1;
            if (offset == 1) {
                if (state != this.nextState)
                    stack.unshift(this.next, this.nextState, 0);
                else
                    stack.unshift(this.next);
                stack[2]++;
            }
            else if (offset == 2) {
                if (state == this.nextState) {
                    stack[1]--;
                    if (!stack[1] || stack[1] < 0) {
                        stack.shift();
                        stack.shift();
                    }
                }
            }
            return [{
                    type: "meta.tag.punctuation." + (offset == 1 ? "" : "end-") + "tag-open.xml",
                    value: val.slice(0, offset)
                }, {
                    type: "meta.tag.tag-name.xml",
                    value: val.substr(offset)
                }];
        },
        regex: "</?(?:" + tagRegex + "|(?=>))",
        next: "jsxAttributes",
        nextState: "jsx"
    };
    this.$rules.start.unshift(jsxTag);
    var jsxJsRule = {
        regex: "{",
        token: "paren.quasi.start",
        push: "start"
    };
    this.$rules.jsx = [
        jsxJsRule,
        jsxTag,
        { include: "reference" }, { defaultToken: "string.xml" }
    ];
    this.$rules.jsxAttributes = [{
            token: "meta.tag.punctuation.tag-close.xml",
            regex: "/?>",
            onMatch: function (value, currentState, stack) {
                if (currentState == stack[0])
                    stack.shift();
                if (value.length == 2) {
                    if (stack[0] == this.nextState)
                        stack[1]--;
                    if (!stack[1] || stack[1] < 0) {
                        stack.splice(0, 2);
                    }
                }
                this.next = stack[0] || "start";
                return [{ type: this.token, value: value }];
            },
            nextState: "jsx"
        },
        jsxJsRule,
        comments("jsxAttributes"),
        {
            token: "entity.other.attribute-name.xml",
            regex: tagRegex
        }, {
            token: "keyword.operator.attribute-equals.xml",
            regex: "="
        }, {
            token: "text.tag-whitespace.xml",
            regex: "\\s+"
        }, {
            token: "string.attribute-value.xml",
            regex: "'",
            stateName: "jsx_attr_q",
            push: [
                { token: "string.attribute-value.xml", regex: "'", next: "pop" },
                { include: "reference" },
                { defaultToken: "string.attribute-value.xml" }
            ]
        }, {
            token: "string.attribute-value.xml",
            regex: '"',
            stateName: "jsx_attr_qq",
            push: [
                { token: "string.attribute-value.xml", regex: '"', next: "pop" },
                { include: "reference" },
                { defaultToken: "string.attribute-value.xml" }
            ]
        },
        jsxTag
    ];
    this.$rules.reference = [{
            token: "constant.language.escape.reference.xml",
            regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }];
}
function comments(next) {
    return [
        {
            token: "comment", // multi line comment
            regex: /\/\*/,
            next: [
                DocCommentHighlightRules.getTagRule(),
                { token: "comment", regex: "\\*\\/", next: next || "pop" },
                { defaultToken: "comment", caseInsensitive: true }
            ]
        }, {
            token: "comment",
            regex: "\\/\\/",
            next: [
                DocCommentHighlightRules.getTagRule(),
                { token: "comment", regex: "$|^", next: next || "pop" },
                { defaultToken: "comment", caseInsensitive: true }
            ]
        }
    ];
}
exports.JavaScriptHighlightRules = JavaScriptHighlightRules;

});

ace.define("ace/mode/mongodb_highlight_rules",[], function(require, exports, module){"use strict";
var oop = require("../lib/oop");
var Json5HighlightRules = require("./json5_highlight_rules").Json5HighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;
var JavaScriptHighlightRules = require("./javascript_highlight_rules").JavaScriptHighlightRules;
var MongoDBHighlightRules = function () {
    var allFunctions = ("update_find|createSearchIndex|dropAllUsers|dropSearchIndex|getSearchIndexes|updateSearchIndex|" +
        "analyzeShardKey|aggregate|bulkWrite|createUser|compactStructuredEncryptionData|configureQueryAnalyzer|" +
        "count|countDocuments|createIndex|createIndexes|dataSize|deleteOne|deleteMany|distinct|drop|" +
        "dropIndex|dropIndexes|ensureIndex|estimatedDocumentCount|explain|findAndModify|findOne|" +
        "findOneAndDelete|findOneAndReplace|findOneAndUpdate|getIndexes|getShardDistribution|getShardVersion|" +
        "hideIndex|insertOne|insertMany|isCapped|latencyStats|mapReduce|reIndex|remove|renameCollection|" +
        "replaceOne|stats|storageSize|totalIndexSize|totalSize|unhideIndex|update|updateOne|updateMany|watch|validate|" +
        "getPlanCache|passwordPrompt|adminCommand|aggregate|commandHelp|createCollection|createView|currentOp|" +
        "dropDatabase|fsyncLock|fsyncUnlock|getCollection|getCollectionInfos|getCollectionNames|" +
        "getLogComponents|getMongo|getName|getProfilingStatus|getReplicationInfo|getSiblingDB|hello|help|hostInfo|" +
        "killOp|listCommands|logout|printCollectionStats|printReplicationInfo|printSecondaryReplicationInfo|" +
        "printShardingStatus|resetError|rotateCertificates|runCommand|serverBuildInfo|serverCmdLineOpts|serverStatus|" +
        "setLogLevel|setProfilingLevel|shutdownServer|stats|version|watch|auth|changeUserPassword|dropUser|" +
        "getUser|getUsers|grantRolesToUser|removeUser|revokeRolesFromUser|revokeRolesFromUserupdateUser|createRole|" +
        "dropRole|dropAllRoles|getRole|getRoles|grantPrivilegesToRole|dbgrantRolesToRole|revokeRolesFromRole|" +
        "updateRolecreateFromBase64|createFromHexString|BinData|Date|ObjectId|createFromHexString|toString|UUID|" +
        "hasWriteError|hasWriteConcernError|ISODate|NumberLong|Code|MaxKey|MinKey|RegExp");
    var optionsKeyword = ("allowDiskUse|allowPartialResults|awaitData|collation|comment|explain|hint|limit|max|" +
        "maxAwaitTimeMS|maxTimeMS|min|noCursorTimeout|readConcern|readPreference|returnKey|showRecordId|skip|sort|" +
        "tailable");
    var keywords = (
    "$eq|$gt|$gte|$in|$lt|$lte|$ne|$nin|$and|$not|$nor|$or|$exists|$type|$expr|$jsonSchema|$mod|" +
        "$regex|$text|$where|$geoIntersects|$geoWithin|$near|$nearSphere|$all|$elemMatch|$size|$bitsAllClear|" +
        "$bitsAllSet|$bitsAnyClear|$bitsAnySet|$|$elemMatch|$meta|$slice|$comment|$rand|" +
        "$match|$group|$sum|$sort|$out|$merge|$geoNear|$project|$addFields|" +
        "$bucket|$bucketAuto|$changeStream|$changeStreamSplitLargeEvent|$collStats|$count|$densify|$documents|$facet|" +
        "$fill|$graphLookup|$indexStats|$limit|$listSampledQueries|$listSearchIndexes|$listSessions|$lookup|" +
        "$planCacheStats|$redact|$replaceRoot|$replaceWith|$sample|$search|$searchMeta|$setWindowFields|$skip" +
        "|$sortByCount|$unionWith|$unwind|$vectorSearch" +
        "$currentDate|$inc|$min|$max|$mul|$rename|$set|$setOnInsert|$unset|" +
        "$addToSet|$pop|$pull|$push|$pullAll|$each|$position|$slice|$bit|" +
        "$abs|$arrayElemAt|$arrayToObject|$accumulator|$asin|$acos|$atan|$atan2|$asinh|$acosh|$atanh|$add|" +
        "$allElementsTrue|$avg|$anyElementTrue|$bitAnd|$bitNot|$bitOr|$bitXor|$binarySize|$bsonSize|$bottomN|" +
        "$bottom|$ceil|$concatArrays|$cos|$cosh|$cond|$cmp|$concat|$convert|$covariancePop|$covarianceSamp|$divide|" +
        "$dateAdd|$dateDiff|$dateFromParts|$dateFromString|$dateSubtract|$dateToParts|$dateTrunc|$dayOfMonth|" +
        "$dayOfWeek|$dayOfYear|$dateToString|$degreesToRadians|$denseRank|$derivative|$documentNumber|$exp|" +
        "$expMovingAvg|$floor|$filter|$firstN|$function|$first|$getField|$hour|$isNumber|$indexOfArray|$isArray|" +
        "$ifNull|isoDayOfWeek|$isoWeek|$isoWeekYear|$indexOfBytes|$indexOfCP|$integral|$ln|$log|$log10|$literal|" +
        "$ltrim|$linearFill|$locf|$let|$last|$lastN|$multiply|$map|$maxN|$median|$mergeObjects|$minN|$millisecond|" +
        "$minute|$month|$objectToArray|$pow|$percentile|$round|$range|$reduce|$reverseArray|$regexFind|$regexFindAll|" +
        "$regexMatch|$replaceOne|$replaceAll|$rtrim|$radiansToDegrees|$rank|$sqrt|$sortArray|$switch|$second|" +
        "$subtract|$sampleRate|Field|$setDifference|$setEquals|$setIntersection|$setIsSubset|$setUnion|$split|" +
        "$strLenBytes|$strLenCP|$strcasecmp|$substr|$substrBytes|$substrCP|$sin|$sinh|$stdDevPop|$stdDevSamp|" +
        "$shift|$toLower|$toString|$trim|$toUpper|$tsSecond|$tan|$tanh|$top|$topN|$toBool|$toDecimal|$toDouble|" +
        "$toInt|$toLong|$toObjectId|$toDate|$toHashedIndexKey|$trunc|$week|$year|$zip");
    var buildinConstants = ("new|NOW|CLUSTER_TIME|ROOT|CURRENT|REMOVE|DESCEND|PRUNE|KEEP|SEARCH_META|USER_ROLES");
    var dbCollectionBuildInFunctions = ("createSearchIndex|dropSearchIndex|getSearchIndexes|updateSearchIndex|" +
        "analyzeShardKey|aggregate|bulkWrite|compactStructuredEncryptionData|configureQueryAnalyzer|" +
        "count|countDocuments|createIndex|createIndexes|dataSize|deleteOne|deleteMany|distinct|drop|" +
        "dropIndex|dropIndexes|ensureIndex|estimatedDocumentCount|explain|find|findAndModify|findOne|" +
        "findOneAndDelete|findOneAndReplace|findOneAndUpdate|getIndexes|getShardDistribution|getShardVersion|" +
        "hideIndex|insertOne|insertMany|isCapped|latencyStats|mapReduce|reIndex|remove|renameCollection|" +
        "replaceOne|stats|storageSize|totalIndexSize|totalSize|unhideIndex|update|updateOne|updateMany|watch|validate|" +
        "getPlanCache|passwordPrompt");
    var dbBuildInFunctions = ("adminCommand|aggregate|commandHelp|createCollection|createView|currentOp|dropAllUsers|dropDatabase|" +
        "fsyncLock|fsyncUnlock|getCollection|getCollectionInfos|getCollectionNames|getLogComponents|getMongo|getName|" +
        "getProfilingStatus|getReplicationInfo|getSiblingDB|hello|help|hostInfo|killOp|listCommands|logout|" +
        "printCollectionStats|printReplicationInfo|printSecondaryReplicationInfo|printShardingStatus|resetError|" +
        "rotateCertificates|runCommand|serverBuildInfo|serverCmdLineOpts|serverStatus|setLogLevel|setProfilingLevel|" +
        "shutdownServer|stats|version|watch|auth|changeUserPassword|dropUser|getUsers|getUser|removeUser|" +
        "revokeRolesFromUser|revokeRolesFromUser|updateUser|createRole|dropRole|dropAllRoles|getRole|getRoles|" +
        "grantPrivilegesToRole|grantRolesToUser|dbgrantRolesToRole|revokeRolesFromRole|updateRole");
    var builtinFunctions = ("createFromBase64|createFromHexString|BinData|Date|ObjectId|createFromHexString|toString|UUID|" +
        "hasWriteError|hasWriteConcernError|ISODate|NumberLong|Code|MaxKey|MinKey|RegExp");
    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "constant.language": buildinConstants
    }, "identifier");
    var findOperators = this.createKeywordMapper({
        "keyword": keywords
    }, "something");
    var functionRegex = "\\b(" + allFunctions + ")\\b";
    var optionsRegex = "\\b(" + optionsKeyword + ")\\b";
    function getNextState(originState) {
        return function (currentState, stack) {
            if (stack.length > 0) {
                return stack.pop();
            }
            else {
                stack.pop();
                return originState;
            }
        };
    }
    function nestTheState(nextState) {
        return function (currentState, stack) {
            stack.push(currentState);
            return nextState;
        };
    }
    var basicDataHighlighting = [
        {
            token: "comment",
            regex: "\\/\\/.*$|\\-\\-.*$"
        },
        {
            token: "comment.start", // multi-line comment
            regex: "\\/\\*",
            push: [
                {
                    token: "comment.end",
                    regex: "\\*\\/",
                    next: "pop"
                }, {
                    defaultToken: "comment"
                }
            ]
        }, {
            token: "string", // single line string
            regex: /(["'])(?:(?=(\\?))\2.)*?\1/
        },
        {
            token: "constant.language", // single line string
            regex: buildinConstants
        },
        {
            token: 'constant.numeric', // hexadecimal, octal and binary
            regex: /\b0[xX][0-9a-fA-F]+\b|\b0[oO][0-7]+\b|\b0[bB][01]+\b/
        }, {
            token: 'constant.numeric', // decimal integers and floats
            regex: "(?<!-)\\b\\d+(\\.\\d+)?\\b(?!-)"
        }
    ];
    this.$rules = {
        "start": [
            basicDataHighlighting,
            {
                token: "keyword",
                regex: "db(?=\\.)",
                next: "database-access"
            }, {
                token: "variable.language",
                regex: "[_a-zA-Z][-a-zA-Z0-9]*(\\s*):"
            },
            {
                token: "multiline.string.start",
                regex: "\`",
                next: "multilineString"
            }
        ],
        "database-access": [
            basicDataHighlighting,
            {
                token: "support.function",
                regex: "(?<=\\.)(\\s*)find(\\s*)(?=\\()",
                next: "find-state"
            },
            {
                token: "support.function",
                regex: "(?<=\\.)(\\s*)" + functionRegex, //TODO: Check
                next: "functionParameter"
            },
            {
                defaultToken: "text"
            }
        ],
        "find-state": [
            basicDataHighlighting,
            {
                token: "paren.quasi.start",
                regex: "\\{",
                next: "json-start"
            }, {
                token: "paren.quasi.start",
                regex: "\\("
            },
            {
                token: "paren.quasi.end",
                regex: "\\)",
                next: "start"
            }, {
                defaultToken: "text"
            }
        ],
        "functionName": [
            {
                token: "paren.quasi.start",
                regex: "\\("
            },
            {
                token: "support.function", // Funktionsname wird gefärbt
                regex: functionRegex,
                next: "pop" // Zurück zum vorherigen Zustand
            },
            {
                token: "text",
                regex: "\\b(?!(" + allFunctions + ")\\b)\\w+\\b",
                next: "pop"
            }
        ],
        "functionParameter": [
            basicDataHighlighting,
            {
                token: "variable.language",
                regex: "[_a-zA-Z][-a-zA-Z0-9]*(\\s*):"
            },
            {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            },
            {
                token: "paren.quasi.start",
                regex: "\\("
            },
            {
                token: "paren.quasi.end",
                regex: "\\)",
                next: "start"
            },
            { defaultToken: "text" }
        ],
        "comment-state": [
            {
                token: "comment.end",
                regex: "\\*\\/",
                next: "start"
            }, {
                defaultToken: "comment"
            }
        ],
        "multilineString": [
            {
                token: "multiline.string.end",
                regex: "\`",
                next: "start"
            },
            {
                token: "js-start",
                regex: "\\$\\{",
                next: nestTheState("javascript-start")
            },
            {
                defaultToken: "comment"
            }
        ]
    };
    this.normalizeRules();
    this.embedRules(Json5HighlightRules, "json-", [
        {
            token: "paren.quasi.end",
            regex: "\\{",
            next: nestTheState("json-start")
        },
        {
            token: "paren.quasi.end",
            regex: "\\}",
            next: getNextState("find-state")
        },
        {
            token: findOperators,
            regex: "\\$\\w+\\b"
        },
        {
            token: "keyword.option",
            regex: optionsRegex + "(\\S?|\\s|\\n)(?=\\:)"
        },
        {
            token: "constant.language", // single line string
            regex: buildinConstants
        }
    ]);
    this.embedRules(JavaScriptHighlightRules, "javascript-", [
        {
            token: "paren.quasi.end",
            regex: "\\{",
            next: nestTheState("javascript-start")
        },
        {
            token: "paren.rparen",
            regex: /}/,
            next: getNextState("multilineString")
        }
    ]);
};
oop.inherits(MongoDBHighlightRules, TextHighlightRules);
exports.MongoDBHighlightRules = MongoDBHighlightRules;

});

ace.define("ace/mode/mongodb",[], function(require, exports, module){var oop = require("../lib/oop");
var TextMode = require("../mode/text").Mode;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var MongoDBHighlightRules = require("./mongodb_highlight_rules").MongoDBHighlightRules;
var Mode = function () {
    this.HighlightRules = MongoDBHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);
(function () {
    this.getNextLineIndent = function (state, line, tab) {
        return this.$getIndent(line);
    };
    this.$id = "ace/mode/mongoDB";
}).call(Mode.prototype);
exports.Mode = Mode;

});
                (function() {
                    ace.require(["ace/mode/mongodb"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            