<template>
    <div>
        <input type="text" v-model="str" @input="keyups"  @focus="focus" @blur="blur"/>
            <ul v-bind:style="{'opacity':opacity}">
                <li v-for="(item,index) in listArr" :key="item.id" 
                    @click="secect(index)" 
                    >
                    {{item.value}}
                </li>
            </ul>
    </div>

</template>
<script>
export default {
    data(){
        return{
            opacity:0,
            str:"",
            listArr:[
                {value:"one",id:"0"},
                {value:"two",id:"1"},
                {value:"theee",id:"2"},
                {value:"four",id:"3"},
                {value:"five",id:"4"},
                {value:"six",id:"5"}
            ],
            strarr:[]
        }
    },
    computed:{

    },
    created(){
        var params={
            name:"hello",
            code:"hahh",
            status:1
        };
        var pa={
            model:params
        };
        this.postAxios("CarInfo/GetCareRecordList",null)
        .then(res => {
          if (res.status == 200 && res.data.status == 1) {
            alert("保存成功");
          } else {
            alert("保存失败。请联系管理员");
          }
        });
    },
    methods:{
        keyups(){
            console.log(this.str)
            let strlast
            if(this.str){
                let arr = this.str.split(',')
                strlast = arr[arr.length-1]
            }
            this.listArr = this.listArr.filter((item)=>{
                return item.value.includes(strlast)
            })
        },
        secect(id){
            this.strarr.push(this.listArr[id].value)
            this.str = this.strarr.join(',')+','
            console.log(this.str)
        },
        focus(){
            this.opacity = 1
        },
        blur(){
           this.opacity = 0
        }
    }
}
</script>
<style>
.select{
    display: none;
}
</style>

