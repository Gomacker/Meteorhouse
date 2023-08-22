<script setup lang="ts">
defineProps<{ party_status: number[]; skill_weights: number }>()
</script>

<template>
  <div>
    <div class="extra-info">
      <div class="extra-info-tag">HP</div>
      <span>{{ party_status[0] }}</span>
    </div>
    <div class="extra-info">
      <div class="extra-info-tag">攻击</div>
      <span>{{ party_status[1] }}</span>
    </div>
    <div class="extra-info">
      <div class="extra-info-tag">能量</div>
      <div
        class="skill-weight-bar"
        :style="{
          '--percent': `${((skill_weights - 200) / (700 - 200)) * 100}%`
        }"
        style="text-align: right; padding-right: 10px"
      />
      <div class="bar-text">
        {{ skill_weights }}
      </div>
    </div>
    <div class="extra-info">
      <div class="extra-info-tag">技能槽</div>
      <div
        class="skill-gauge-bar"
        :style="{
          '--percent': `0%`
        }"
      />
      <div class="bar-text">unavailable</div>
    </div>
  </div>
</template>

<style scoped>
.extra-info-tag {
  --fill-color: rgb(222, 223, 222);
  height: 20px;
  width: 48px;
  font-size: 10px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  background: linear-gradient(1rad, var(--fill-color) 0, var(--fill-color) 80%, transparent 80%);
}
.skill-weight-bar {
  width: 112px;
  height: 20px;
  --percent: 0%; /* 百分比 */
  --fill-color: rgb(33, 194, 230);
  --bar-color: rgb(173, 170, 173);
  --step-width: 15px;
  --gap-width: 2px;
  --bar-start: 8px;
  --percent-fixed: calc(var(--bar-start) + (0.825 * var(--percent))); /* 百分比渲染修正 */
  margin-left: calc(-1 * var(--bar-start));
  background: linear-gradient(
      1rad,
      var(--fill-color) var(--percent-fixed),
      transparent var(--percent-fixed)
    ),
    var(--bar-color);
  --mask: linear-gradient(
    1rad,
    transparent 0,
    transparent calc(var(--gap-width) + var(--bar-start)),
    white calc(var(--gap-width) + var(--bar-start) + 1px),
    white calc(var(--gap-width) + var(--step-width) + var(--bar-start)),
    transparent calc(var(--gap-width) + var(--step-width) + var(--bar-start) + 1px),
    transparent calc(2 * var(--gap-width) + var(--step-width) + var(--bar-start)),
    white calc(2 * var(--gap-width) + var(--step-width) + var(--bar-start) + 1px),
    white calc(2 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start)),
    transparent calc(2 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(3 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start)),
    white calc(3 * var(--gap-width) + 2 * var(--step-width) + var(--bar-start) + 1px),
    white calc(3 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start)),
    transparent calc(3 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(4 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start)),
    white calc(4 * var(--gap-width) + 3 * var(--step-width) + var(--bar-start) + 1px),
    white calc(4 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start)),
    transparent calc(4 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(5 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start)),
    white calc(5 * var(--gap-width) + 4 * var(--step-width) + var(--bar-start) + 1px),
    white calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start)),
    transparent calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(6 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start))
  );
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
.skill-gauge-bar {
  width: 112px;
  height: 20px;
  --percent: 0%; /* 百分比 */
  --fill-color: rgb(255, 158, 25);
  --bar-color: rgb(173, 170, 173);
  --step-width: 15px;
  --gap-width: 2px;
  --bar-start: 8px;
  --percent-fixed: calc(var(--bar-start) + (0.825 * var(--percent))); /* 百分比渲染修正 */
  margin-left: calc(-1 * var(--bar-start));
  background: linear-gradient(
      1rad,
      var(--fill-color) var(--percent-fixed),
      transparent var(--percent-fixed)
    ),
    var(--bar-color);
  --mask: linear-gradient(
    1rad,
    transparent 0,
    transparent calc(var(--gap-width) + var(--bar-start)),
    white calc(var(--gap-width) + var(--bar-start) + 1px),
    white calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start)),
    transparent calc(5 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start) + 1px),
    transparent calc(6 * var(--gap-width) + 5 * var(--step-width) + var(--bar-start))
  );
  -webkit-mask: var(--mask);
  mask: var(--mask);
}
.extra-info > span {
  padding-right: 15px;
}
.extra-info {
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 5px;
}

.bar-text {
  position: absolute;
  background-clip: text;
  -webkit-background-clip: text;
  right: 20px;
  -webkit-text-fill-color: black;
  --text-stroke-width: 0.25em;
  -webkit-text-stroke: var(--text-stroke-width) transparent;
  background-color: white;
  padding: var(--text-stroke-width);
  margin: calc(-1 * var(--text-stroke-width));
}
</style>
