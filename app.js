const app = Vue.createApp({
  // data: function() {}  # 메소드 속기법, 이렇게 작성할 수도 있다.
  data() {  // 항상 객체를 반환해야 한다.
    return {
      counter: 0,
      num: 1,
      name: '',
      alarmTimeout: null,
    };
  },
  methods: { // 스크립트 작성
    // plus_counter: function() {}  // 얘도 메소드 속기법? 으로 작성이 가능해서 이렇게 작성이 가능
    plus_counter() {
      this.counter = this.counter + this.num
    },
    reduce_counter() {
      this.counter = this.counter - this.num
    },
    toggleDisabled() {
      isButtonDisabled.value = !isButtonDisabled.value
    },
    setName(event) {
      this.name = this.$refs.tmp_name.value
    },
    reset() {
      this.counter = 0
    }
  },
  watch: {
    counter(value) {
      const that = this
      if (value < 0 && !this.alarmTimeout) {
        this.alarmTimeout = setTimeout(() => {
          alert("0보다 작을 수 없습니다")
          that.num = 1
          that.counter = 0
          that.alarmTimeout = null
        }, 1000)
      }
    }
  },
  computed: { },
  
});


/*  // 앱 환경설정 가능
app.config.errorHandler = (err) => {  // 앱 레벨의 에러 핸들러

}

app.component('TodoDeleteButton', TodoDeleteButton) // 앱 범위의 에셋을 등록

*/

const app1 = Vue.createApp({
  data() {
    return {
      number: 0,
      tweened: 0,
    }
  },
  watch: {  // 값이 변경될 때마다 호출됨
    number(n) { // 'number' 가 변경될 때마다 호출
      gsap.to(this, { duration: 2, tweened: Number(n) || 0 }) // duration: 2 -> 2초 동안 값을 변경
    }, 
  },
  template: `
    <h2>[Animate_number & template]</h2>
    Input number: <input type="number" v-model.number="number" />
    <p>Output_Number : {{ tweened.toFixed(0) }}</p>
    `,
})


const app2 = Vue.createApp({  // computed 
  data() {
    return {
      fname: '',
      lname: '',
      // fullname: '',
    }
  },
  methods: {

  },
  computed : {
    fullname(value) {
      if ( this.fname === "" && this.lname === "" ){
        return ''
      } return this.fname + ' ' + this.lname + ' ' + "( imhotman )"
    },
  },
})

const app3 = Vue.createApp({
  data () {
    return {
      lists: [],
      base_msg: '추가해주세요',
      enter_msg: '',
      selectedIndex: null,
    }
  },
  methods: {
    add_msg () {
      this.enter_msg = this.$refs.tmp_msg.value
      if ( this.enter_msg === "" ){
        alert("내용을 입력해주세요")
      } else {
        this.lists.push(this.enter_msg)
        this.$refs.tmp_msg.value = ''
      }
    },
    reset_msg () {
      this.lists = []
      this.selectedIndex = null
    },
    select_list (index) {
      this.selectedIndex = index
    },
    delete_list () {
      this.lists.splice(this.selectedIndex, 1)
      console.log(this.selectedIndex)
      this.selectedIndex = null
    }
  },
  watch: {
    // enter_msg(value) {
    //   if ( this.enter_msg === "" ){
    //     alert("내용을 입력해주세요")
    //   } else {
    //     this.lists.push(this.enter_msg)
    //     this.$refs.tmp_msg.value = ''
    //   }
    // },
  }
})

// const routes4 = {
//   '/': Home,
//   '/about': About
// }

const app4 = Vue.createApp({
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  },
})


// 하나의 페이지로 앱 인스턴스는 제한되지 않고, 조그만한 기능 단위로 정의해서 사용 가능
// 여러 앱 마운트 ( 마운트를 하지 않으면 렌더링이 되지 않는다.)
app.mount("#app_vue");
app1.mount("#app_template")
app2.mount("#app_compute")
app3.mount("#list_vue")
// app4.use(routes4)
app4.mount("#tmp")