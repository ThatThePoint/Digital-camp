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

