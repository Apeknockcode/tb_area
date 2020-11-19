<template>
  <div class="Address" v-show="AddressState">
    <div class="Address_box">
      <div class="Address_title">
        请选择你所在的地区
        <div class="close_icon" @click="closeBtn"></div>
      </div>

      <div class="UserSelectArea" v-show="address.province.value">
        <div class="Area">
          <!-- 省 -->
          <div
            class="areaBox"
            ref="Province"
            @click="
              lingIndex.Province = true;
              lingIndex.City = false;
              lingIndex.Area = false;
              lingIndex.Street = false;
              bandArea('Province');
            "
          >
            <span :class="index == 0 ? 'isChangeColor' : ''">
              {{ address.province.label }}</span
            >
            <div class="ring ring0">
              <div
                class="stepRing1"
                :class="{ fillerRing: address.province.value }"
              ></div>
              <div class="stepRing2"></div>
            </div>
          </div>
          <!-- 市 -->
          <div
            class="areaBox"
            ref="City"
            @click="
              lingIndex.Province = false;
              lingIndex.City = true;
              lingIndex.Area = false;
              lingIndex.Street = false;
              bandArea('City');
            "
            v-show="address.province.value || address.city.value"
          >
            <span :class="index == 1 ? 'isChangeColor' : ''">
              {{ address.city.label }}</span
            >
            <div class="ring ring1">
              <div class="stepRing0"></div>
              <div
                class="stepRing1"
                :class="{ fillerRing: address.city.value }"
              ></div>
              <div class="stepRing2" v-show="address.city.value"></div>
            </div>
          </div>
          <!-- 县 -->
          <div
            class="areaBox"
            ref="Area"
            @click="
              lingIndex.Province = false;
              lingIndex.City = false;
              lingIndex.Area = true;
              lingIndex.Street = false;
              bandArea('Area');
            "
            v-show="address.city.value || address.area.value"
          >
            <span :class="index == 2 ? 'isChangeColor' : ''">
              {{ address.area.label }}</span
            >

            <div class="ring ring1">
              <div class="stepRing0"></div>
              <div
                class="stepRing1"
                :class="{ fillerRing: address.area.value }"
              ></div>
              <div class="stepRing2" v-show="address.area.value"></div>
            </div>
          </div>
          <!-- 街道 -->
          <div
            class="areaBox"
            ref="Street"
            @click="
              lingIndex.Province = false;
              lingIndex.City = false;
              lingIndex.Area = false;
              lingIndex.Street = true;
              bandArea('Street');
            "
            v-show="address.area.value || address.street.value"
          >
            <span
              :class="
                lingIndex.Street || index == 3 || index == 4
                  ? 'isChangeColor'
                  : ''
              "
            >
              {{ address.street.label }}</span
            >
            <div class="ring ring3">
              <div class="stepRing0"></div>
              <div
                class="stepRing1"
                :class="{ fillerRing: address.street.value }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="wholeCountry" :style="{ height: wholeCountryHeight + 'px' }">
        <div class="AreaName">
          {{
            index == 0
              ? "请选择省份/地区"
              : index == 1
              ? "请选择城市"
              : index == 2
              ? "请选择区/县"
              : index == 3 || index == 4
              ? "请选择街道/镇"
              : ""
          }}
        </div>
        <div
          class="AreaList"
          v-for="(item, index) in area"
          :key="index"
          @click="handAreaList(item)"
        >
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  props: ["tbState", "areaParent"],
  data() {
    return {
      AddressState: false,
      area: [],
      initialArea: [],
      wholeCountryHeight: "",
      timeHeight: "",
      index: 0,
      lingIndex: {
        Province: false,
        City: false,
        Area: false,
        Street: false
      },
      address: {
        province: {
          label: "请选择省份/地区"
        },
        city: {
          label: "请选择城市"
        },
        area: {
          label: "请选择区/县"
        },
        street: {
          label: "请选择街道/镇"
        }
      }
    };
  },
  created() {
    this.timeHeight = setTimeout(() => {
      this.wholeCountryHeight =
        document.getElementsByClassName("Address_box")[0].clientHeight -
        document.getElementsByClassName("Address_title")[0].clientHeight -
        document.getElementsByClassName("UserSelectArea")[0].clientHeight;
    }, 100);
  },
  watch: {
    tbState(value) {
      this.AddressState = value;
      if (value) {
        this.SizeHeight();
      }
    },
    areaParent(value) {
      console.log("areaParent", value);
      this.area = value;
      this.initialArea = value;
    }
  },
  computed: {},
  mounted() {},
  methods: {
    SizeHeight() {
      this.timeHeight = setTimeout(() => {
        this.wholeCountryHeight =
          document.getElementsByClassName("Address_box")[0].clientHeight -
          document.getElementsByClassName("Address_title")[0].clientHeight -
          document.getElementsByClassName("UserSelectArea")[0].clientHeight;
      }, 100);
    },
    bandArea(difference) {
      let UserChangeName = this.$refs[difference].innerText;
      let initialArea = this.initialArea;
      // 筛选数据
      if (
        UserChangeName == "请选择省份/地区" ||
        UserChangeName == "请选择城市" ||
        UserChangeName == "请选择区/县" ||
        UserChangeName == "请选择街道/镇"
      ) {
        return false;
      }
      if (difference == "Province") {
        this.index = 0;
        this.area = initialArea;
      }
      if (difference == "City") {
        let Province = this.$refs.Province.innerText;
        initialArea.map(item => {
          if (item.label == Province) {
            this.index = 1;
            this.area = item.children;
          }
        });
      }
      if (difference == "Area") {
        let Province = this.$refs.Province.innerText;
        let City = this.$refs.City.innerText;
        initialArea.map(item => {
          if (item.label == Province) {
            item.children.map(item => {
              if (item.label == City) {
                this.index = 2;
                this.area = item.children;
              }
            });
          }
        });
      }
      if (difference == "Street") {
        let Province = this.$refs.Province.innerText;
        let City = this.$refs.City.innerText;
        let Area = this.$refs.Area.innerText;
        initialArea.map(item => {
          if (item.label == Province) {
            item.children.map(item => {
              if (item.label == City) {
                item.children.map(item => {
                  if (item.label == Area) {
                    this.index = 3;
                    this.area = item.children;
                  }
                });
              }
            });
          }
        });
      }
    },
    handAreaList(item) {
      var that = this;
      if (that.index != 3 && that.index != 4) {
        if (item.children.length == 0) {
          //   console.log("下面没有数据了");
          that.closeBtn();
        }
        that.area = item.children ? item.children : that.closeBtn();
      }
      that.SizeHeight();
      that.setAddress(item);
    },
    setAddress(item) {
      var that = this;
      if (that.index == 0) {
        if (that.address.province.label != "请选择省份/地区") {
          that.address = {
            province: {
              label: "请选择省份/地区"
            },
            city: {
              label: "请选择城市"
            },
            area: {
              label: "请选择区/县"
            },
            street: {
              label: "请选择街道/镇"
            }
          };
        }
        that.address.province = item;
        that.index = 1;
      } else if (that.index == 1) {
        if (that.address.city.label != "请选择城市") {
          that.address.area = { label: "请选择区/县" };
          that.address.street = { label: "请选择街道/镇" };
        }
        that.address.city = item;
        that.index = 2;
      } else if (that.index == 2) {
        if (that.address.city.label != "请选择区/县") {
          that.address.street = { label: "请选择街道/镇" };
        }
        that.address.area = item;
        that.index = 3;
      } else if (that.index == 3) {
        that.address.street = item;
        that.index = 4;
      } else if (that.index == 4) {
        that.address.street = item;
        that.index = 4;
      }
    },
    closeBtn() {
      this.$emit("closeTbModel", { state: false, address: this.address });
    }
  }
};
</script>

<style lang="less" scoped>
.Address {
  width: 100vw;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 2020;
  overflow: hidden;
  top: 0px;
  left: 0px;
  .Address_box {
    width: 100vw;
    height: 80vh;
    background: #fff;
    position: absolute;
    bottom: 0px;
    left: 0px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    .Address_title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      position: relative;
      .close_icon {
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 0px;
        bottom: 0;
        margin: auto;
        width: 20px;
        height: 2px;
        background-color: #222;
        transform: rotate(45deg);
      }
      .close_icon:hover {
        background-color: #222;
      }
      .close_icon::after {
        cursor: pointer;
        content: "";
        display: block;
        width: 20px;
        height: 2px;
        background-color: #222;
        transform: rotate(90deg);
      }
      .close_icon:hover::after {
        background-color: #222;
      }
    }
    .UserSelectArea {
      width: 100%;
      background: #fff;
      padding: 16px 20px;
      padding-top: 0px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #cfcfcf;
      .Area {
        position: relative;
        .areaBox {
          height: 40px;
          padding-left: 30px;
          text-align: left;
          display: flex;
          align-items: center;
          font-size: 16px;
          position: relative;
          overflow: hidden;
          .isChangeColor {
            color: red;
          }
        }
        .ring {
          position: absolute;
          left: 10px;
          top: 0px;
          bottom: 0px;
          .stepRing0 {
            width: 2px;
            height: 16px;
            // border-radius: 100%;
            // border: 1px solid red;
            background: red;
            position: absolute;
            top: 0px;
            left: 4px;
          }
          .stepRing1 {
            width: 8px;
            height: 8px;
            border-radius: 100%;
            border: 1px solid red;
            position: absolute;
            top: 15px;
            left: 0px;
          }
          .stepRing2 {
            width: 2px;
            height: 16px;
            // border-radius: 100%;
            // border: 1px solid red;
            background: red;
            position: absolute;
            top: 24px;
            left: 4px;
          }
          .fillerRing {
            background: red;
          }
        }
        .line {
          position: absolute;
          width: 2px;
          height: 80%;
          display: inline-block;
          background: red;
          left: 10px;
          top: 15px;
          display: flex;
          justify-content: center;
        }
      }
    }
    .wholeCountry {
      width: 100%;
      height: 300px;
      padding-top: 10px;
      box-sizing: border-box;
      overflow-y: scroll;
      .AreaName {
        font-size: 14px;
        color: #cfcfcf;
        text-align: left;
        padding-left: 30px;
        box-sizing: border-box;
      }
      .AreaList {
        text-align: left;
        padding-left: 30px;
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
    }
  }
}
</style>
