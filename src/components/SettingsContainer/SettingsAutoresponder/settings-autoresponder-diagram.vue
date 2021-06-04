<template>
    <div class="settings-autoresponder-diagram" ref="diagram" id="settings-autoresponder-diagram">
        <SettingsAutoresponderCard style="top: 50px; left: 50px"></SettingsAutoresponderCard>

    </div>
</template>

<script>
    import { onMounted, watch, ref } from 'vue';
    import SettingsAutoresponderCard from './SettingsAutoresponderCard'
    export default {
        components: {
            SettingsAutoresponderCard
        },
        setup(props, {emit}) {
            const diagram = ref(null);
//             onMounted(() => {
//                 let nodes = [
//                     { id: 1,
//                         label: "<input type='text' value='kekichi'> пример 1",
//                         margin: 20, x: 0, y: 0,
//                         font: { multi: "html", size: 20 },
//                     },
//                     { id: 2, label: "Пример 2", margin: 20, x: 0, y: 0 },
//                     {
//                         id: 3,
//                         label: "Пример 3",
//                         margin: 20, x: 0, y: 0 ,
//                     },
//                     {
//                         id: 4,
//                         label: "Пример 4",
//                         margin: 20, x: 0, y: 0
//                     },
//                 ];
//
// // create an array with edges
//                 let edges = [
//                     { from: 1, to: 2 },
//                     { from: 2, to: 3 },
//                     { from: 3, to: 4 },
//                     { from: 4, to: 1 },
//                 ];
//
// // create a network
//                 let container = document.getElementById('settings-autoresponder-diagram');
//                 let data = {
//                     nodes: nodes,
//                     edges: edges,
//                 };
//                 let options = {
//                     nodes: {
//                         shape: "box",
//                     },
//                 };
//                 let network = new vis.Network(container, data, options);
//             })
            return {
                diagram
            }

        }
    }
</script>

<style lang="scss">
    .settings-autoresponder-diagram {
        background: var(--left-bar-color);
        width: 100%;
        height: calc(100% - 34px - 26px);
        border-radius: 6px;
        position: relative;
        .vis-network {
            outline: none;
        }
    }
</style>