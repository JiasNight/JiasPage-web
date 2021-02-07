<template>
  <div>
    <Button
      type="primary"
      shape="circle"
      long
      size="large"
      @click="showUsersBtn()"
      >显示用户</Button
    >
    <Table stripe :columns="tableColums" :data="userList"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableColums: [],
      userList: [],
    };
  },
  mounted() {},
  methods: {
    // 显示按钮
    showUsersBtn() {
      this.$axios
        // .get("http://49.233.217.34:8090/user/allUser")
        .get("/user/allUser")
        .then((res) => {
          console.log(res.data.data);
          if (res.status === 200) {
            this.userList = res.data.data;
            let data = res.data.data[0];
            console.log(data);
            for (const key in data) {
              if (data.hasOwnProperty.call(data, key)) {
                console.log(key);
                let title = {
                  title: key,
                  key: key,
                };
                this.tableColums.push(title);
                // console.log(this.tableColums)
              }
            }
            this.$Message.info("登录成功");
          } else {
            this.$Message.info("登录失败");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>