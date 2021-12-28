<template>
    <div class="settings-autoresponder-diagram"  id="settings-autoresponder-diagram" @wheel.ctrl="zoom">
        <div class="settings-autoresponder-diagram__container" ref="diagram" id="settings-autoresponder-diagram__container">
        </div>
        <svg id="settings-autoresponder-diagram__create-button" class="settings-autoresponder-diagram__create-button" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="22" cy="22" r="22" fill="var(--search-input-placeholder-color)"/>
            <rect x="20.1658" y="11" width="3.66667" height="22.9167" rx="1.83333"
                  fill="var(--left-bar-color)"/>
            <rect x="10.0842" y="23.833" width="3.66667" height="22.9167" rx="1.83333" transform="rotate(-90 10.0842 23.833)"
                  fill="var(--left-bar-color)"/>
            <defs>
                <linearGradient id="paint0_linear" x1="-18.1975" y1="61.3827" x2="53.2346" y2="-8.41975" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#22A595"/>
                    <stop offset="1" stop-color="#84D160"/>
                </linearGradient>
            </defs>
        </svg>
        <div v-show="currentCell"
             class="settings-autorespondeer-diagram__sidebar"
             id="settings-autorespondeer-diagram__sidebar">
            <SettingsAutoresponderDiagramEditForm
                    ref="form"
                  @changeForced="changeObjectValues"
                  :cell-data="currentCell"
                  :selected-type="selectedType"
            />
        </div>


    </div>
</template>

<script>
    import SettingsAutoresponderDiagramEditForm from './settings-autoresponder-diagram-edit-form'
    import mxgraph from 'mxgraph';

    const graphConfig = {
        mxBasePath: '/mx/', //Specifies the path in mxClient.basePath.
        mxImageBasePath: '/mx/images', // Specifies the path in mxClient.imageBasePath.
        mxLanguage: 'en', // Specifies the language for resources in mxClient.language.
        mxDefaultLanguage: 'en', // Specifies the default language in mxClient.defaultLanguage.
        mxLoadResources: false, // Specifies if any resources should be loaded.  Default is true.
        mxLoadStylesheets: false, // Specifies if any stylesheets should be loaded.  Default is true
    };

    const {
        mxClient, mxUtils, mxEvent, mxEditor, mxRectangle, mxGraph, mxGeometry, mxCell,
        mxImage, mxDivResizer, mxObjectCodec, mxCodecRegistry, mxConnectionHandler, mxConstants,
        mxPerimeter, mxEdgeStyle, mxPoint
    } = mxgraph(graphConfig);

    window.mxClient = mxClient;
    window.mxUtils = mxUtils;
    window.mxRectangle = mxRectangle;
    window.mxGraph = mxGraph;
    window.mxEvent = mxEvent;
    window.mxGeometry = mxGeometry;
    window.mxCell = mxCell;
    window.mxImage = mxImage;
    window.mxEditor = mxEditor;
    window.mxDivResizer = mxDivResizer;
    window.mxObjectCodec = mxObjectCodec;
    window.mxCodecRegistry = mxCodecRegistry;
    window.mxConnectionHandler = mxConnectionHandler;
    window.mxConstants = mxConstants;
    window.mxPerimeter = mxPerimeter;
    window.mxEdgeStyle = mxEdgeStyle;
    window.mxPoint = mxPoint;

    var editor;

    //ИСПРАВИТЬ НА СВОЙ ЮЗЕР ОБЖЕКТ
    window.CustomUserObject = function (messageSettings) {
        this.messageSettings = messageSettings;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };
    window.CustomUserObjectStart = function (condition) {
        this.isStart = true;
        this.condition = condition;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };
    window.CustomUserObjectConnector = function (isOutput = false) {
        this.isConnect = true;
        this.isOutput = isOutput;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };
    window.CustomUserObjectConnectorWithLabel = function (name) {
        this.isConnectWithLabel = true;
        this.name = name;
        this.clone = function () {
            return mxUtils.clone(this);
        };
    };

    export default {
        components: {
            SettingsAutoresponderDiagramEditForm,
        },
        props: {
            blocks: Array,
        },
        data() {
            return {
                currentCell: null,
                selectedType: null,
            }
        },
        methods: {
            selectionChanged(sender, evt) {
                let cell = editor.graph.getSelectionCell();
                this.currentCell = cell;
                if (cell && cell.value) {
                    cell.value.isStart && (this.selectedType = 'start');
                    cell.value.messageSettings && (this.selectedType = 'messageSettings');
                }
                setTimeout(() => {
                    this.$refs.form.updateValues();
                }, 0)
            },
            focusTextarea(e) {
                this.selectedType = 'textarea';
                this.$refs.form.updateValues();
            },
            openSettings() {
                this.selectedType = 'messageSettings';
                this.$refs.form.updateValues();
            },
            deleteCell(evt, up) {
                let model = editor.graph.getModel();
                model.beginUpdate();
                try {
                    editor.graph.removeCells([this.currentCell])
                } finally {
                    model.endUpdate();
                }
            },
            // возврат обновленного значения в среду mxGraph
            changeObjectValues(newCellValue) {
          
                editor.graph.model.setValue(this.currentCell, newCellValue);

                let model = editor.graph.getModel();
                model.beginUpdate();
                try {
                    this.createLinksCurrentCell(model);
                    // if (newCellValue.messageSettings) {
                    //     this.currentCell.value.messageSettings = newCellValue.messageSettings;
                    // }
                } finally {
                    model.endUpdate();
                }
            },
            createLinksCurrentCell(model, cell = this.currentCell) {
                //let links = cell.value.condition.linksOutput;
                let links = cell.value.messageSettings.linksOutput;
                /* console.log(cell.value.condition.linksOutput); */
               
                links.forEach((link, index) => {
                    if (!cell.children[index+1]) {
                        let connector = new window.CustomUserObjectConnector(true);
                        let connectors = new mxCell(connector, new mxGeometry(0, 0, 11, 11), '');
                        connectors.setVertex(true);
                        connectors.setConnectable(true);
                        let cn = model.cloneCell(connectors);
                        cn.geometry.x = 333;
                        //28 - отступ. 19 - высота выхода. 67 - первоначальный отступ.
                        cn.geometry.y = index * (28 + 19) + 67;
                        cn.style = 'movable=0'
                        editor.graph.addCell(cn, cell)
                    }
                })
            },
            addMessageBlock(block = null) {
                let customObject = new window.CustomUserObject({
                    choice: null,
                    linksOutput: ['Ответили', 'Всегда', 'Не ответили'],
                    linksOutputTypes: ['Replied', 'Always', 'NotReplied'],
                    message: {
                        data: block
                            ? block.message.text
                            : '',
                        type: 'text'
                    },
                    processing_type: block
                        ? block.processing_type
                        : null,
                    processing_text: block
                        ? block.processing_text
                        : ''
                });

                let prototype = new mxCell(customObject, new mxGeometry(0, 0, 345, 207), '');
                prototype.setVertex(true);
                prototype.setConnectable(false);

                let parent = editor.graph.getDefaultParent();
                let model = editor.graph.getModel();

                let v1 = model.cloneCell(prototype);

                model.beginUpdate();
                try {
                    if (block) {
                        v1.geometry.x = block.pos.x;
                        v1.geometry.y = block.pos.y;
                    } else {
                        v1.geometry.x = 300;
                        v1.geometry.y = 300;
                    }

                    // v1.style = editor.graph.stylesheet.getDefaultEdgeStyle();
                    // v1.geometry.alternateBounds = new mxRectangle(0, 0, v1.geometry.width, v1.geometry.height, '');

                    editor.graph.addCell(v1, parent);

                    let connector = new window.CustomUserObjectConnector();
                    let connectors = new mxCell(connector, new mxGeometry(0, 0, 11, 11), '');
                    connectors.setVertex(true);
                    connectors.setConnectable(true);
                    let cn = model.cloneCell(connectors);
                    cn.geometry.x = 0;
                    cn.geometry.y = 115;

                    editor.graph.addCell(cn, v1);
                    this.createLinksCurrentCell(model, v1);
                    // graph.insertVertex(v1, null, node, 40, 40, 40, 40);

                } finally {
                    model.endUpdate();
                }

                editor.graph.setSelectionCell(v1);


                let textareas = document.querySelectorAll('.settings-autoresponder-card__message');
                textareas.forEach(i => {
                    mxEvent.removeAllListeners(i);
                    mxEvent.addListener(i, "click", this.focusTextarea );
                })
                let burgers = document.querySelectorAll('.settings-autoresponder-card__burger');
                burgers.forEach(i => {
                    mxEvent.removeAllListeners(i);
                    mxEvent.addListener(i, "click", this.openSettings );
                })

                let delButtons = document.querySelectorAll('.settings-autoresponder-card__del-button');
                delButtons.forEach(i => {
                    mxEvent.removeAllListeners(i);
                    mxEvent.addListener(i, "click", this.deleteCell );
                })
            },
            // добавление элементов sidebar
            initAddMessageBlock() {
                let d = document.getElementById('settings-autoresponder-diagram__create-button')
                d.addEventListener('click', () => {
                    this.addMessageBlock()
                })
                if (this.blocks) {
                    let messagesBlocks = this.blocks.filter(i => i.type === 'AMessagesBlock');
                    messagesBlocks.forEach(i => {
                        this.addMessageBlock(i)
                    })
                }
            },
            initEdges() {
              if (this.blocks) {

              }
            },
            addEdges(from, to) {
                let parent = editor.graph.getDefaultParent();
                let model = editor.graph.getModel();
                model.beginUpdate();
                try {
                    if (from && to) {
                        editor.graph.insertEdge(parent, null, '', from, to);
                    }
                } finally {
                    model.endUpdate();
                }
            },
            addStartElement() {
                let startElem = this.blocks.find(i => i.type === "AStartBlock");
                let customObjectStart = new window.CustomUserObjectStart({
                    processing_type: startElem? startElem.processing_type : "All", // null --> "ALL"
                    processing_text: startElem? startElem.keywords.join(' ') : '',
                    linksOutput: ['start'],
                    linksOutputTypes: ['start'],
                });
                let object = new mxCell(customObjectStart, new mxGeometry(0, 0, 86, 33), '');
                object.setVertex(true);
                object.setConnectable(false);

                let parent = editor.graph.getDefaultParent();
                let model = editor.graph.getModel();

                let v1 = model.cloneCell(object);
                model.beginUpdate();
                try {
                    if (startElem) {
                        v1.geometry.x = startElem.pos.x;
                        v1.geometry.y = startElem.pos.y;
                    } else {
                        v1.geometry.x = 200;
                        v1.geometry.y = 200;
                    }

                    editor.graph.addCell(v1, parent);

                    let connectorModel = new window.CustomUserObjectConnector(true);
                    let connectors = new mxCell(connectorModel, new mxGeometry(0, 0, 11, 11), '');
                    connectors.setVertex(true);
                    connectors.setConnectable(true);
                    let connector = model.cloneCell(connectors);
                    connector.geometry.x = 81.5;
                    connector.geometry.y = 11.5;
                    editor.graph.addCell(connector, v1);

                    // v1.createVertexTemplateEntry('image;html=1;image=someobject100x100.png', 100, 100, '', 'title')
                } finally {
                    model.endUpdate();
                }
                editor.graph.setSelectionCell(v1);
            },
            decode(model) {
                return Object.keys(model.cells).map(
                    (iCell)=>{
                        const currentCell = model.getCell(iCell);
                        return (currentCell.value !== undefined)? currentCell : null;
                    }
                ).filter((item)=> (item !== null));
            },

            getJsonModel(){
                const jsonModel = this.decode(editor.graph.getModel());
                return {
                    "graph": jsonModel
                }
            },
            // создание и настройка редактора
            createGraph() {
                // Checks if the browser is supported
                if (!mxClient.isBrowserSupported()) {
                    // Displays an error message if the browser is not supported.
                    mxUtils.error('Browser is not supported!', 200, false);
                } else {
                    // mxConnectionHandler.prototype.connectImage = new mxImage(require('../assets/handle-connect.png'), 16, 16);

                    let container = document.getElementById('settings-autoresponder-diagram__container');

                    let sidebar = document.getElementById('settings-autorespondeer-diagram__sidebar');

                    if (mxClient.IS_QUIRKS) {
                        new mxDivResizer(container);
                        new mxDivResizer(sidebar);
                    }

                    editor = new mxEditor();
                    editor.setGraphContainer(container);


                    //стили
                    // editor.graph.stylesheet.getDefaultVertexStyle()[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                    editor.graph.stylesheet.getDefaultVertexStyle()[mxConstants.STYLE_PERIMETER] =
                        mxPerimeter.EntityPerimeter;
                    editor.graph.stylesheet.getDefaultVertexStyle()[mxConstants.VERTEX_SELECTION_COLOR] =
                        '';
                    editor.graph.stylesheet.getDefaultVertexStyle()[mxConstants.STYLE_FILLCOLOR] =
                        'var(--left-bar-color)';
                    delete editor.graph.stylesheet.getDefaultVertexStyle()[mxConstants.STYLE_STROKECOLOR];

              /////////////////////////////////////////////////////////////////////////////////////////////////////      
                    /* console.log(mxConstants.OUTLINE_COLOR)
                    mxConstants.OUTLINE_COLOR =                    //ME
                        'var(--left-bar-color)';
                    console.log(mxConstants.OUTLINE_COLOR) */

                    // console.log(mxConstants.VERTEX_SELECTION_COLOR)
                    mxConstants.VERTEX_SELECTION_COLOR =                    //ME
                        'none';
                    // console.log(mxConstants.VERTEX_SELECTION_COLOR)
              ////////////////////////////////////////////////////////////////////////////////////////////////////      


                    editor.graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_EDGE] =
                        mxEdgeStyle.EntityRelation;
                    editor.graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_STROKECOLOR] = 'var(--search-input-placeholder-color)';
                    // editor.graph.stylesheet.getDefaultEdgeStyle()[mxConstants.STYLE_FONTCOLOR] = 'var(--search-input-placeholder-color)';

                    // глобальное управление подключениями
                    editor.graph.setConnectable(true);
                    editor.graph.setCellsDisconnectable(true);
                    editor.graph.setPanning(true);
                    editor.graph.setAllowDanglingEdges(false);

                    editor.graph.setCellsResizable(false);
                    editor.graph.tooltipHandler.setEnabled(false);


                    // изменение выбранных в отдельной панели
                    editor.graph.getSelectionModel().addListener(mxEvent.CHANGE, (sender, evt) => {
                        this.selectionChanged(sender, evt);
                    });
                    this.selectionChanged();

                    editor.graph.centerZoom = false;
                    editor.graph.swimlaneNesting = false;
                    editor.graph.dropEnabled = true;

                    //zoom
                    mxEvent.addMouseWheelListener((evt, up) => {
                        if (mxEvent.isConsumed(evt)) {
                            return;
                        }
                        let gridEnabled = editor.graph.gridEnabled;

                        // disable snapping
                        editor.graph.gridEnabled = false;
                        if (evt.ctrlKey) {
                            let p1 = editor.graph.getPointForEvent(evt, false);

                            if (up) {
                                editor.graph.zoomIn();
                            } else {
                                editor.graph.zoomOut();
                            }

                            let p2 = editor.graph.getPointForEvent(evt, false);
                            let deltaX = p2.x - p1.x;
                            let deltaY = p2.y - p1.y;
                            let view = editor.graph.view;

                            view.setTranslate(view.translate.x + deltaX, view.translate.y + deltaY);
                        }
                        else if (evt.shiftKey) {
                            let view = editor.graph.view;

                            view.setTranslate(view.translate.x + evt.wheelDelta, view.translate.y);
                        } else {
                            let view = editor.graph.view;

                            view.setTranslate(view.translate.x, view.translate.y  + evt.wheelDelta);
                        }

                        editor.graph.gridEnabled = gridEnabled;

                        mxEvent.consume(evt);

                    }, container);

                    // Fields are dynamically created HTML labels
                    editor.graph.isHtmlLabel = function (cell) {
                        return !this.isSwimlane(cell) &&
                            !this.model.isEdge(cell);
                    };

                    // not editable
                    editor.graph.isCellEditable = function () {
                        return false
                    };

                    // Returns the name propertie of the user object for the label
                    editor.graph.convertValueToString = function (cell) {
                        if (cell.value != null && cell.value.name != null) {
                            return cell.value.name;
                        }
                        return mxGraph.prototype.convertValueToString.apply(this, arguments); // "supercall"
                    };

                    // Creates a dynamic HTML label for properties
                    
                    editor.graph.getLabel = function (cell) {
                        if (cell && this.isHtmlLabel(cell) && cell.value) {
                            // TODO тут код html для содержимого Field
                            let label;
                            if (cell.value.isStart) {
                                label = `<div class="settings-autoresponder-start-card">
                                            <div class="settings-autoresponder-start-card__inner">
                                                <span>
                                                    СТАРТ
                                                </span>
                                            </div>
                                        </div>`
                            } else if (cell.value.isConnect) {
                                label = `<div class="settings-autoresponder-card__link"></div>`
                            } else if (cell.value.isConnectWithLabel) {
                                label = `<div class="settings-autoresponder-card__link-name">
                                            <span>${cell.value.name}</span>
                                            <div class="settings-autoresponder-card__link"></div>
                                        </div>`
                            } else if (cell.value.messageSettings) {
                                label = `<div class="settings-autoresponder-card">
                                            <div class="settings-autoresponder-card__container">
                                                <div class="settings-autoresponder-card__header">
                                                    Сообщение
                                                </div>
                                                <div class="settings-autoresponder-card__actions-container">
                                                    <svg class="settings-autoresponder-card__del-button pointer" style="margin-right: 18px" width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.2 3H12.72C12.5343 2.15356 12.0431 1.39301 11.329 0.846539C10.6149 0.300068 9.72176 0.00109089 8.8 0H7.2C6.27824 0.00109089 5.38506 0.300068 4.671 0.846539C3.95694 1.39301 3.46568 2.15356 3.28 3H0.8C0.587827 3 0.384344 3.07902 0.234315 3.21967C0.0842854 3.36032 0 3.55109 0 3.75C0 3.94891 0.0842854 4.13968 0.234315 4.28033C0.384344 4.42098 0.587827 4.5 0.8 4.5H1.6V14.25C1.60127 15.2442 2.02311 16.1973 2.77298 16.9003C3.52285 17.6033 4.53952 17.9988 5.6 18H10.4C11.4605 17.9988 12.4772 17.6033 13.227 16.9003C13.9769 16.1973 14.3987 15.2442 14.4 14.25V4.5H15.2C15.4122 4.5 15.6157 4.42098 15.7657 4.28033C15.9157 4.13968 16 3.94891 16 3.75C16 3.55109 15.9157 3.36032 15.7657 3.21967C15.6157 3.07902 15.4122 3 15.2 3ZM7.2 1.5H8.8C9.29622 1.50057 9.7801 1.64503 10.1853 1.91358C10.5905 2.18213 10.8971 2.56162 11.0632 3H4.9368C5.10287 2.56162 5.40952 2.18213 5.81471 1.91358C6.2199 1.64503 6.70378 1.50057 7.2 1.5ZM12.8 14.25C12.8 14.8467 12.5471 15.419 12.0971 15.841C11.647 16.2629 11.0365 16.5 10.4 16.5H5.6C4.96348 16.5 4.35303 16.2629 3.90294 15.841C3.45286 15.419 3.2 14.8467 3.2 14.25V4.5H12.8V14.25ZM6.39961 13.5001C6.61178 13.5001 6.81526 13.421 6.96529 13.2804C7.11532 13.1397 7.19961 12.949 7.19961 12.7501V8.25006C7.19961 8.05115 7.11532 7.86039 6.96529 7.71973C6.81526 7.57908 6.61178 7.50006 6.39961 7.50006C6.18744 7.50006 5.98395 7.57908 5.83392 7.71973C5.68389 7.86039 5.59961 8.05115 5.59961 8.25006V12.7501C5.59961 12.949 5.68389 13.1397 5.83392 13.2804C5.98395 13.421 6.18744 13.5001 6.39961 13.5001ZM10.1645 13.2804C10.0145 13.421 9.81101 13.5001 9.59883 13.5001C9.38666 13.5001 9.18317 13.421 9.03314 13.2804C8.88311 13.1397 8.79883 12.949 8.79883 12.7501V8.25006C8.79883 8.05115 8.88311 7.86039 9.03314 7.71973C9.18317 7.57908 9.38666 7.50006 9.59883 7.50006C9.81101 7.50006 10.0145 7.57908 10.1645 7.71973C10.3146 7.86039 10.3988 8.05115 10.3988 8.25006V12.7501C10.3988 12.949 10.3146 13.1397 10.1645 13.2804Z" fill="#9797BB"/>
                                                    </svg>
                                                    <svg class="settings-autoresponder-card__burger pointer" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="18" height="2" rx="1" fill="#9797BB"/>
                                                        <rect y="6" width="18" height="2" rx="1" fill="#9797BB"/>
                                                        <rect y="12" width="18" height="2" rx="1" fill="#9797BB"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div class="settings-autoresponder-card__container">
                                                <textarea class="settings-autoresponder-card__message">
                                                    ${cell.value.messageSettings.message.data}
                                                </textarea>
                                                <div class="settings-autoresponder-card__links-container">
                                                    ${cell.value.messageSettings.linksOutput.map(i => `<div class="settings-autoresponder-card__link-name">${i}</div>`).join('')}
                                                </div>
                                            </div>

                                        </div>`
                            }
                            return label.replace(/\n/g, '');
                        }

                        return mxGraph.prototype.getLabel.apply(this, arguments); // "supercall"
                    };



                    this.addStartElement();
                    this.initAddMessageBlock();
                    this.initEdges();
                }
            },
            // настройка параметров
            init() {
                //////////////////////////////////////////
                // КОДЕКИ КАСТОМНЫХ ПОЛЕЙ для импорта экспорта
                //////////////////////////////////////////

                let codecCustomUserObject = new mxObjectCodec(new window.CustomUserObject());
                codecCustomUserObject.encode = function (enc, obj) {
                    let node = enc.document.createElement('CustomUserObject');
                    mxUtils.setTextContent(node, JSON.stringify(obj));

                    return node;
                };
                codecCustomUserObject.decode = function (dec, node) {
                    let obj = JSON.parse(mxUtils.getTextContent(node));
                    let beatyObj = new window.CustomUserObject();
                    obj = Object.assign(beatyObj, obj);
                    return obj;
                };
                mxCodecRegistry.register(codecCustomUserObject);

                mxConnectionHandler.prototype.movePreviewAway = true;

                this.createGraph();
            },
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss" src="./settings-autoresponder-diagram.scss"></style>