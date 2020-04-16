<template>
  <div class="rt-card">
   111
  </div>
</template>

<script>
export default {
  name: 'RtCard',

}
</script>

<style lang="less">
@px: 16rem;
.rt-card {
  background-color: #fff;
  border: 1/@px solid #ddd;
  border-radius: 100px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(136, 136, 136, 0.527);
  margin-bottom: 40px;

  &__text {
    width: 70%;
    padding-right: 5px;
    font-size: 15/@px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:nth-child(2n) {
      width: 30%;
    }
    & > span {
      color: #555;
    }
  }

  &__info {
    height: 100/@px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px 20px;
  }
  &__action {
    height: 50/@px;
    background-color: rgb(247, 247, 247);
    border-top: 1/@px solid #ddd;
    display: flex;
    justify-content: space-between;
  }
  &-btn {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14/@px;
    border-right: 1/@px solid #ddd;
    &:active {
      background-color: rgba(0, 0, 0, 0.13);
    }
    &:last-child {
      border-right: none;
    }
    &__icon {
      height: 30%;
      margin-right: 5/@px;
      overflow: hidden;
      & > img {
        height: 100%;
      }
    }
    &__text {
      &.default {
        color: #8d8d8d;
      }
      &.primary {
        color: #3a72f2;
      }
      &.error {
        color: #e92222;
      }
    }
  }
}
</style>