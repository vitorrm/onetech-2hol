<template>
  <div class="objectInspector">
    <div class="panels">
      <div class="from transitions">
        <div v-for="trans in object.transitionsTo">
          <TransitionView :transition="trans" :selectedObject="object" />
        </div>
      </div>
      <div class="info">
        <h2>{{object.name.split(' - ')[0]}}</h2>
        <h3>{{object.name.split(' - ')[1]}}</h3>
        <ObjectImage :object="object" />
        <ul>
          <li v-if="object.foodValue > 0">Food: {{object.foodValue}}</li>
          <li v-if="object.heatValue > 0">Heat: {{object.heatValue}}</li>
        </ul>
      </div>
      <div class="to transitions">
        <div v-for="trans in object.transitionsFrom">
          <TransitionView :transition="trans" :selectedObject="object" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ObjectImage from './ObjectImage';
import TransitionView from './TransitionView';

export default {
  props: ['object'],
  components: {
    ObjectImage,
    TransitionView
  },
  beforeMount () {
    console.dir(this.object);
  },
}
</script>

<style scoped>
  .objectInspector {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-content: center;

    background-color: #222;
    margin-top: 10px;
    border-radius: 5px;
  }

  .objectInspector > h3 {
    text-align: center;
  }

  .info {
    flex: 1 1 0;

    background-color: #333;
    margin: 10px;
    border-radius: 5px;

    padding-bottom: 30px;
  }
  .info > h2 {
    text-align: center;
    font-weight: bolder;
    margin-bottom: 0px;
  }
  .info > h3 {
    text-align: center;
    font-weight: lighter;
    font-style: italic;
    margin-top: 0px;
  }
  .info > .imgContainer {
    width: 100%;
    height: 256px;
  }
  .info > ul {
    margin: 5px 30px 5px 30px;
    font-size: 1.3rem;
    list-style-type: none;
  }

  .panels {
    display: flex;
    flex-direction: row;

    padding: 10px;
  }
  .panels > .transitions {
    width: 220px;

    display: flex;
    flex-direction: column;
    align-content: center;
  }
  .panels > .transitions > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>