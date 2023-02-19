<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-if="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', totalPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页
    totalPage() {
      // Math.ceil向上取整： 总数据/显示的数据=总页
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字【连续页码的数字：至少是5】
    startNumAndEndNum() {
      const { continues, totalPage, pageNo } = this;
      // 先定义两个变量分别存储起始数字和结束数字
      let start = 0,
        end = 0;
      // 连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够5页情况】
      // 不正常现象：总页没有连续页多 >连续页
      if (continues > totalPage) {
        // 连续页 > 总页
        start = 1; // 起始页
        end = totalPage; // 结束页=总页
      } else {
        // 正常现象【连续页码5，但是总页一定是大于5的】
        // parseInt取整
        // 比如当前是第8页，连续页码为5 -----》 6 7 8 9 10
        // 比如当前是第8页，连续页码为8 -----》 5 6 7 8 9 10 11
        // 起始页：当前页 - （连续页 / 2） = 开始页 || 8 - parseInt(7 / 2) => 8 - 3 = 5（起始页为5）|| 8 - parseInt(5 / 2) => 8 - 2 = 6（起始页为6）
        start = pageNo - parseInt(continues / 2);

        // 结束页：当前页 + （连续页 / 2） = 结束页 || 8 + parseInt(7 / 2) => 8 + 3 = 11（结束页为11）|| 8 + parseInt(5 / 2) => 8 + 2 = 10（结束页为10）
        end = pageNo + parseInt(continues / 2);

        // 把出现不正常的现象【start数字出现0|负数】纠正：例如：当前页为1，那么通过以上方式计算就会出现 -1 0 1 2 3这种情况，我们的页码是没有0|负数的
        if (start < 1) {
          // 判断：起始页 < 1
          start = 1; // 起始页变回1
          end = continues; // 结束页为连续页 5 || 1-5
        }
        // 把出现不正常的现象【end数字出现大于总页码】纠正：例如：当前页为31，那么通过以上方式计算就会出现 29 30 31 32 33这种情况，32|33是超过总页的
        if (end > totalPage) {
          // 结束页 > 总页
          end = totalPage; // 结束页为总页
          start = totalPage - continues + 1; // 开始页 = 总页 - 连续页 + 1 || 31 - 5 + 1 = 27 ||27-31
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
