import ace from 'ace-builds/src-noconflict/ace'

ace.define("ace/theme/goethe-css",[], function(require, exports, module){module.exports = ".ace-goethe .ace_gutter {\n  background: #f0f0f0;\n  color: #333;\n}\n\n.ace-goethe .ace_print-margin {\n  width: 1px;\n  background: #e8e8e8;\n}\n\n.ace-goethe {\n  background-color: white;\n  color: black\n}\n\n.ace-goethe .ace_cursor {\n  color: black;\n  }\n\n.ace-goethe .ace_marker-layer .ace_selection {\n  background: rgb(181, 213, 255);\n}\n\n.ace-goethe.ace_multiselect .ace_selection.ace_start {\n  box-shadow: 0 0 3px 0px white;\n}\n\n.ace-goethe .ace_marker-layer .ace_step {\n  background: rgb(252, 255, 0);\n}\n\n.ace-goethe .ace_marker-layer .ace_bracket {\n  margin: -1px 0 0 -1px;\n  border: 1px solid rgb(192, 192, 192);\n}\n\n.ace-goethe .ace_marker-layer .ace_active-line {\n  background: rgba(0, 0, 0, 0.07);\n}\n\n.ace-goethe .ace_gutter-active-line {\n    background-color : #dcdcdc;\n}\n\n.ace-goethe .ace_marker-layer .ace_selected-word {\n  background: rgb(250, 250, 255);\n  border: 1px solid rgb(200, 200, 250);\n}\n\n.ace-goethe .ace_invisible {\n  color: rgb(191, 191, 191);\n}\n\n.ace-goethe .ace_entity.ace_name.ace_tag,\n.ace-goethe .ace_keyword,\n.ace-goethe .ace_meta.ace_tag,\n.ace-goethe .ace_storage {\n  color: #0000ff \n}\n\n.ace-goethe .ace_punctuation,\n.ace-goethe .ace_punctuation.ace_tag {\n  color: #fff\n}\n\n.ace-goethe .ace_constant.ace_character,\n.ace-goethe .ace_constant.ace_language,\n.ace-goethe .ace_constant.ace_numeric,\n.ace-goethe .ace_constant.ace_other {\n  color: #6c1380\n}\n\n.ace-goethe .ace_invalid {\n  color: #F8F8F0;\n  background-color: #F92672\n}\n\n.ace-goethe .ace_invalid.ace_deprecated {\n  color: #F8F8F0;\n  background-color: #AE81FF\n}\n\n.ace-goethe .ace_support.ace_constant,\n.ace-goethe .ace_support.ace_function {\n  color: #805b13\n}\n\n.ace-goethe .ace_fold {\n  background-color: #6B72E6;\n}\n\n.ace-goethe .ace_storage.ace_type,\n.ace-goethe .ace_support.ace_class,\n.ace-goethe .ace_support.ace_type {\n  font-style: italic;\n  color: #66D9EF\n}\n\n.ace-goethe .ace_entity.ace_name.ace_function,\n.ace-goethe .ace_entity.ace_other,\n.ace-goethe .ace_entity.ace_other.ace_attribute-name,\n.ace-goethe .ace_variable {\n  color: #315fb5\n}\n\n.ace-goethe .ace_variable.ace_parameter {\n  font-style: italic;\n  color: #FD971F\n}\n\n.ace-goethe .ace_string {\n  color: rgb(3, 106, 7);\n}\n\n.ace-goethe .ace_comment {\n  color: #75715E\n}\n\n.ace-goethe .ace_indent-guide {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\n}\n\n.ace-goethe .ace_indent-guide-active {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQIW2PQ1dX9zzBz5sz/ABCcBFFentLlAAAAAElFTkSuQmCC) right repeat-y;\n}\n";

});

ace.define("ace/theme/goethe",[], function(require, exports, module){"use strict";
exports.isDark = false;
exports.cssClass = "ace-goethe";
exports.cssText = require("./goethe-css");
exports.$id = "ace/theme/goethe";
var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass, false);

});
                (function() {
                    ace.require(["ace/theme/goethe"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            