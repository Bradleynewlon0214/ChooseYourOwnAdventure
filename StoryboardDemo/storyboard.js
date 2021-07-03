/* global $ */
$(document).ready(function () {
    var $flowchart = $('#flowchartworkspace');
    var $container = $flowchart.parent();

    // Apply the plugin on a standard, empty div...
    $flowchart.flowchart({
        data: defaultFlowchartData,
        defaultSelectedLinkColor: '#000055',
        grid: 1,
        multipleLinksOnInput: true,
        multipleLinksOnOutput: true
    });

    //-----------------------------------------
    //--- operator and link properties
    //--- start

    function constructInputVals() {
        let inputLabelArray = [];
        let outputLabelArray = [];
        let inputNames = document.getElementById('input_names_el');
        let outputNames = document.getElementById('output_names_el');

        for (let i = 0; i < inputNames.children.length; i++)
            inputLabelArray.push(inputNames.children[i].value);

        for (let i = 0; i < outputNames.children.length; i++)
            outputLabelArray.push(outputNames.children[i].value);

        return {
            'inputLabelArray': inputLabelArray,
            'outputLabelArray': outputLabelArray,
            'input_names_el': inputNames,
            'output_names_el': outputNames,
            'input_count_el': document.getElementById('input_count_el'),
            'output_count_el': document.getElementById('output_count_el'),
            'input_num': parseInt(document.getElementById('input_count_el').value),
            'output_num': parseInt(document.getElementById('output_count_el').value),
        };
    }

    let opConfig = constructInputVals();
    var input_names_el = opConfig.input_names_el;
    var output_names_el = opConfig.output_names_el;
    var input_num = opConfig.input_num;
    var output_num = opConfig.output_num;

    document.getElementById('input_count_el').onchange = function () {
        labelOnchange(input_names_el, "input");
    };

    document.getElementById('output_count_el').onchange = function () {
        labelOnchange(output_names_el, "output");
    };

    document.getElementById('clear-label-btn').onclick = function () {
        opConfig = constructInputVals();
        document.getElementById('input_count_el').value = "";
        document.getElementById('output_count_el').value = "";
        document.getElementById('input_names_el').innerHTML = "";
        document.getElementById('output_names_el').innerHTML = "";
        document.getElementById('input_count_el').onchange;
        document.getElementById('output_count_el').onchange;
    };

    var $operatorProperties = $('#operator_properties');
    $operatorProperties.hide();
    var $linkProperties = $('#link_properties');
    $linkProperties.hide();
    var $operatorTitle = $('#operator_title');
    var $linkColor = $('#link_color');

    $flowchart.flowchart({
        onOperatorSelect: function (operatorId) {
            $operatorProperties.show();
            $operatorTitle.val($flowchart.flowchart('getOperatorTitle', operatorId));
            return true;
        },
        onOperatorUnselect: function () {
            $operatorProperties.hide();
            return true;
        },
        onLinkSelect: function (linkId) {
            $linkProperties.show();
            $linkColor.val($flowchart.flowchart('getLinkMainColor', linkId));
            return true;
        },
        onLinkUnselect: function () {
            $linkProperties.hide();
            return true;
        }
    });

    $operatorTitle.keyup(function () {
        var selectedOperatorId = $flowchart.flowchart('getSelectedOperatorId');
        if (selectedOperatorId != null) {
            $flowchart.flowchart('setOperatorTitle', selectedOperatorId, $operatorTitle.val());
        }
    });

    $linkColor.change(function () {
        var selectedLinkId = $flowchart.flowchart('getSelectedLinkId');
        if (selectedLinkId != null) {
            $flowchart.flowchart('setLinkMainColor', selectedLinkId, $linkColor.val());
        }
    });
    //--- end
    //--- operator and link properties
    //-----------------------------------------

    //-----------------------------------------
    //--- delete operator / link button
    //--- start
    $flowchart.parent().siblings('.delete_selected_button').click(function () {
        $flowchart.flowchart('deleteSelected');
    });
    //--- end
    //--- delete operator / link button
    //-----------------------------------------



    //-----------------------------------------
    //--- create operator button
    //--- start
    var operatorI = 0;
    $flowchart.parent().siblings('.create_operator').click(function () {
        opConfig = constructInputVals();
        input_names_el = opConfig.input_names_el;
        output_names_el = opConfig.output_names_el;
        input_num = opConfig.input_num;
        output_num = opConfig.output_num;

        let inputLabelArray = opConfig.inputLabelArray;
        let outputLabelArray = opConfig.outputLabelArray;

        var operatorId = 'created_operator_' + operatorI;
        var operatorData = null;

        console.log(inputLabelArray);

        if (!isNaN(input_num) || !isNaN(output_num)) {
            var inputArr = {};
            var outputArr = {};

            // Inputs
            for (let i = 0; i < input_num; i++) {
                let inLabel = inputLabelArray[i].trim();

                if (inLabel == "") {
                    inputArr['input_' + i] = {
                        label: "Input " + (i + 1)
                    };
                } else {
                    inputArr['input_' + i] = {
                        label: inLabel
                    };
                }

            }

            // Outputs
            for (let i = 0; i < output_num; i++) {
                let outLabel = outputLabelArray[i].trim();

                if (outLabel == "") {
                    outputArr['output_' + i] = {
                        label: "Output " + (i + 1)
                    };
                } else {
                    outputArr['output_' + i] = {
                        label: outLabel
                    };
                }
            }

            if (input_num == 0)
                operatorData = {
                    top: ($flowchart.height() / 2) - 30,
                    left: ($flowchart.width() / 2) - 100 + (operatorI * 10),
                    properties: {
                        title: 'Operator ' + (operatorI + 3),
                        outputs: outputArr
                    }
                };
            else if (output_num == 0)
                operatorData = {
                    top: ($flowchart.height() / 2) - 30,
                    left: ($flowchart.width() / 2) - 100 + (operatorI * 10),
                    properties: {
                        title: 'Operator ' + (operatorI + 3),
                        inputs: inputArr
                    }
                };
            else
                operatorData = {
                    top: ($flowchart.height() / 2) - 30,
                    left: ($flowchart.width() / 2) - 100 + (operatorI * 10),
                    properties: {
                        title: 'Operator ' + (operatorI + 3),
                        inputs: inputArr,
                        outputs: outputArr
                    }
                };
        } else {
            operatorData = {
                top: ($flowchart.height() / 2) - 30,
                left: ($flowchart.width() / 2) - 100 + (operatorI * 10),
                properties: {
                    title: 'Operator ' + (operatorI + 3),
                    inputs: {
                        input_1: {
                            label: 'Input 1',
                        }
                    },
                    outputs: {
                        output_1: {
                            label: 'Output 1',
                        }
                    }
                }
            };
        }


        operatorI++;

        $flowchart.flowchart('createOperator', operatorId, operatorData);

    });
    //--- end
    //--- create operator button
    //-----------------------------------------

    //-----------------------------------------
    //--- save and load
    //--- start
    function Flow2Text() {
        var data = $flowchart.flowchart('getData');
        $('#flowchart_data').val(JSON.stringify(data, null, 2));
    }
    $('#get_data').click(Flow2Text);

    function Text2Flow() {
        var data = JSON.parse($('#flowchart_data').val());
        $flowchart.flowchart('setData', data);
    }
    $('#set_data').click(Text2Flow);

    /*global localStorage*/
    function SaveToLocalStorage() {
        if (typeof localStorage !== 'object') {
            alert('local storage not available');
            return;
        }
        Flow2Text();
        localStorage.setItem("stgLocalFlowChart", $('#flowchart_data').val());
    }
    $('#save_local').click(SaveToLocalStorage);

    function LoadFromLocalStorage() {
        if (typeof localStorage !== 'object') {
            alert('local storage not available');
            return;
        }
        var s = localStorage.getItem("stgLocalFlowChart");
        if (s != null) {
            $('#flowchart_data').val(s);
            Text2Flow();
        } else {
            alert('local storage empty');
        }
    }
    $('#load_local').click(LoadFromLocalStorage);
    //--- end
    //--- save and load
    //-----------------------------------------


});

var defaultFlowchartData = {
    operators: {
        operator1: {
            top: 20,
            left: 20,
            properties: {
                title: 'Operator 1',
                inputs: {},
                outputs: {
                    output_1: {
                        label: 'Output 1',
                    }
                }
            }
        },
        operator2: {
            top: 80,
            left: 300,
            properties: {
                title: 'Operator 2',
                inputs: {
                    input_1: {
                        label: 'Input 1',
                    },
                    input_2: {
                        label: 'Input 2',
                    },
                },
                outputs: {}
            }
        },
    },
    links: {
        link_1: {
            fromOperator: 'operator1',
            fromConnector: 'output_1',
            toOperator: 'operator2',
            toConnector: 'input_2',
        },
    }
};

if (false)
    console.log('remove lint unused warning', defaultFlowchartData);

function labelOnchange(elem, label_type) {
    if (elem) elem.innerHTML = "";

    let num = parseInt(document.getElementById(label_type + '_count_el').value);

    for (let i = 0; i < num; i++) {
        var name = document.createElement('input');
        name.setAttribute('type', 'text');
        name.setAttribute('id', label_type + '-name-' + (i + 1));
        name.setAttribute('style', 'display: block;');
        elem.appendChild(name);
    }
}