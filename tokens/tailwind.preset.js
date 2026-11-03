// YBM Design System — Tailwind preset
// ⚠ tokens/build.mjs 가 생성한다. 직접 고치지 말 것. 생성: 2026-10-29
// 모든 값이 CSS 변수를 가리키므로 ybm-ds.css 를 함께 로드해야 동작한다.
// tailwind.config.js → module.exports = { presets: [require('./tokens/tailwind.preset.js')], … }

module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "gray": {
          "00": "var(--ds-color-palette-gray-00)",
          "100": "var(--ds-color-palette-gray-100)",
          "200": "var(--ds-color-palette-gray-200)",
          "300": "var(--ds-color-palette-gray-300)",
          "400": "var(--ds-color-palette-gray-400)",
          "500": "var(--ds-color-palette-gray-500)",
          "600": "var(--ds-color-palette-gray-600)",
          "700": "var(--ds-color-palette-gray-700)",
          "800": "var(--ds-color-palette-gray-800)",
          "900": "var(--ds-color-palette-gray-900)",
          "1000": "var(--ds-color-palette-gray-1000)"
        },
        "brand": {
          "100": "var(--ds-color-palette-brand-100)",
          "200": "var(--ds-color-palette-brand-200)",
          "300": "var(--ds-color-palette-brand-300)",
          "400": "var(--ds-color-palette-brand-400)",
          "500": "var(--ds-color-palette-brand-500)",
          "600": "var(--ds-color-palette-brand-600)",
          "700": "var(--ds-color-palette-brand-700)",
          "800": "var(--ds-color-palette-brand-800)",
          "900": "var(--ds-color-palette-brand-900)",
          "1000": "var(--ds-color-palette-brand-1000)"
        },
        "blue": {
          "100": "var(--ds-color-palette-blue-100)",
          "200": "var(--ds-color-palette-blue-200)",
          "300": "var(--ds-color-palette-blue-300)",
          "400": "var(--ds-color-palette-blue-400)",
          "500": "var(--ds-color-palette-blue-500)",
          "600": "var(--ds-color-palette-blue-600)",
          "700": "var(--ds-color-palette-blue-700)",
          "800": "var(--ds-color-palette-blue-800)",
          "900": "var(--ds-color-palette-blue-900)",
          "1000": "var(--ds-color-palette-blue-1000)"
        },
        "green": {
          "100": "var(--ds-color-palette-green-100)",
          "200": "var(--ds-color-palette-green-200)",
          "300": "var(--ds-color-palette-green-300)",
          "400": "var(--ds-color-palette-green-400)",
          "500": "var(--ds-color-palette-green-500)",
          "600": "var(--ds-color-palette-green-600)",
          "700": "var(--ds-color-palette-green-700)",
          "800": "var(--ds-color-palette-green-800)",
          "900": "var(--ds-color-palette-green-900)",
          "1000": "var(--ds-color-palette-green-1000)"
        },
        "orange": {
          "100": "var(--ds-color-palette-orange-100)",
          "200": "var(--ds-color-palette-orange-200)",
          "300": "var(--ds-color-palette-orange-300)",
          "400": "var(--ds-color-palette-orange-400)",
          "500": "var(--ds-color-palette-orange-500)",
          "600": "var(--ds-color-palette-orange-600)",
          "700": "var(--ds-color-palette-orange-700)",
          "800": "var(--ds-color-palette-orange-800)",
          "900": "var(--ds-color-palette-orange-900)",
          "1000": "var(--ds-color-palette-orange-1000)"
        },
        "yellow": {
          "100": "var(--ds-color-palette-yellow-100)",
          "200": "var(--ds-color-palette-yellow-200)",
          "300": "var(--ds-color-palette-yellow-300)",
          "400": "var(--ds-color-palette-yellow-400)",
          "500": "var(--ds-color-palette-yellow-500)",
          "600": "var(--ds-color-palette-yellow-600)",
          "700": "var(--ds-color-palette-yellow-700)",
          "800": "var(--ds-color-palette-yellow-800)",
          "900": "var(--ds-color-palette-yellow-900)",
          "1000": "var(--ds-color-palette-yellow-1000)"
        },
        "purple": {
          "100": "var(--ds-color-palette-purple-100)",
          "200": "var(--ds-color-palette-purple-200)",
          "300": "var(--ds-color-palette-purple-300)",
          "400": "var(--ds-color-palette-purple-400)",
          "500": "var(--ds-color-palette-purple-500)",
          "600": "var(--ds-color-palette-purple-600)",
          "700": "var(--ds-color-palette-purple-700)",
          "800": "var(--ds-color-palette-purple-800)",
          "900": "var(--ds-color-palette-purple-900)",
          "1000": "var(--ds-color-palette-purple-1000)"
        },
        "red": {
          "100": "var(--ds-color-palette-red-100)",
          "200": "var(--ds-color-palette-red-200)",
          "300": "var(--ds-color-palette-red-300)",
          "400": "var(--ds-color-palette-red-400)",
          "500": "var(--ds-color-palette-red-500)",
          "600": "var(--ds-color-palette-red-600)",
          "700": "var(--ds-color-palette-red-700)",
          "800": "var(--ds-color-palette-red-800)",
          "900": "var(--ds-color-palette-red-900)",
          "1000": "var(--ds-color-palette-red-1000)"
        },
        "static": {
          "white": "var(--ds-color-palette-static-white)",
          "black": "var(--ds-color-palette-static-black)",
          "black-alpha-100": "var(--ds-color-palette-static-black-alpha-100)",
          "black-alpha-200": "var(--ds-color-palette-static-black-alpha-200)",
          "black-alpha-300": "var(--ds-color-palette-static-black-alpha-300)",
          "black-alpha-400": "var(--ds-color-palette-static-black-alpha-400)",
          "black-alpha-500": "var(--ds-color-palette-static-black-alpha-500)",
          "black-alpha-600": "var(--ds-color-palette-static-black-alpha-600)",
          "black-alpha-700": "var(--ds-color-palette-static-black-alpha-700)",
          "black-alpha-800": "var(--ds-color-palette-static-black-alpha-800)",
          "black-alpha-900": "var(--ds-color-palette-static-black-alpha-900)",
          "black-alpha-1000": "var(--ds-color-palette-static-black-alpha-1000)",
          "white-alpha-50": "var(--ds-color-palette-static-white-alpha-50)",
          "white-alpha-100": "var(--ds-color-palette-static-white-alpha-100)",
          "white-alpha-200": "var(--ds-color-palette-static-white-alpha-200)",
          "white-alpha-300": "var(--ds-color-palette-static-white-alpha-300)",
          "white-alpha-400": "var(--ds-color-palette-static-white-alpha-400)",
          "white-alpha-500": "var(--ds-color-palette-static-white-alpha-500)",
          "white-alpha-600": "var(--ds-color-palette-static-white-alpha-600)",
          "white-alpha-700": "var(--ds-color-palette-static-white-alpha-700)",
          "white-alpha-800": "var(--ds-color-palette-static-white-alpha-800)",
          "white-alpha-900": "var(--ds-color-palette-static-white-alpha-900)",
          "white-alpha-1000": "var(--ds-color-palette-static-white-alpha-1000)"
        },
        "logo": {
          "ybm-blue": "var(--ds-color-logo-ybm-blue)",
          "ybm-gray": "var(--ds-color-logo-ybm-gray)",
          "ybm-red": "var(--ds-color-logo-ybm-red)"
        },
        "bg": {
          "brand-solid": "var(--ds-color-bg-brand-solid)",
          "brand-solid-pressed": "var(--ds-color-bg-brand-solid-pressed)",
          "brand-weak": "var(--ds-color-bg-brand-weak)",
          "brand-weak-pressed": "var(--ds-color-bg-brand-weak-pressed)",
          "canvas": "var(--ds-color-bg-canvas)",
          "critical-solid": "var(--ds-color-bg-critical-solid)",
          "critical-solid-pressed": "var(--ds-color-bg-critical-solid-pressed)",
          "critical-weak": "var(--ds-color-bg-critical-weak)",
          "critical-weak-pressed": "var(--ds-color-bg-critical-weak-pressed)",
          "disabled": "var(--ds-color-bg-disabled)",
          "informative-solid": "var(--ds-color-bg-informative-solid)",
          "informative-solid-pressed": "var(--ds-color-bg-informative-solid-pressed)",
          "informative-weak": "var(--ds-color-bg-informative-weak)",
          "informative-weak-pressed": "var(--ds-color-bg-informative-weak-pressed)",
          "layer-default": "var(--ds-color-bg-layer-default)",
          "layer-floating": "var(--ds-color-bg-layer-floating)",
          "magic-solid": "var(--ds-color-bg-magic-solid)",
          "magic-solid-pressed": "var(--ds-color-bg-magic-solid-pressed)",
          "magic-weak": "var(--ds-color-bg-magic-weak)",
          "magic-weak-pressed": "var(--ds-color-bg-magic-weak-pressed)",
          "neutral": "var(--ds-color-bg-neutral)",
          "neutral-inverted": "var(--ds-color-bg-neutral-inverted)",
          "neutral-inverted-pressed": "var(--ds-color-bg-neutral-inverted-pressed)",
          "neutral-muted": "var(--ds-color-bg-neutral-muted)",
          "neutral-solid": "var(--ds-color-bg-neutral-solid)",
          "neutral-solid-pressed": "var(--ds-color-bg-neutral-solid-pressed)",
          "neutral-subtle": "var(--ds-color-bg-neutral-subtle)",
          "neutral-weak-alpha": "var(--ds-color-bg-neutral-weak-alpha)",
          "neutral-weak-alpha-pressed": "var(--ds-color-bg-neutral-weak-alpha-pressed)",
          "neutral-weak-pressed": "var(--ds-color-bg-neutral-weak-pressed)",
          "overlay": "var(--ds-color-bg-overlay)",
          "positive-solid": "var(--ds-color-bg-positive-solid)",
          "positive-solid-pressed": "var(--ds-color-bg-positive-solid-pressed)",
          "positive-weak": "var(--ds-color-bg-positive-weak)",
          "positive-weak-pressed": "var(--ds-color-bg-positive-weak-pressed)",
          "transparent": "var(--ds-color-bg-transparent)",
          "transparent-pressed": "var(--ds-color-bg-transparent-pressed)",
          "warning-solid": "var(--ds-color-bg-warning-solid)",
          "warning-solid-pressed": "var(--ds-color-bg-warning-solid-pressed)",
          "warning-weak": "var(--ds-color-bg-warning-weak)",
          "warning-weak-pressed": "var(--ds-color-bg-warning-weak-pressed)"
        },
        "fg": {
          "brand": "var(--ds-color-fg-brand)",
          "brand-contrast": "var(--ds-color-fg-brand-contrast)",
          "critical": "var(--ds-color-fg-critical)",
          "critical-contrast": "var(--ds-color-fg-critical-contrast)",
          "disabled": "var(--ds-color-fg-disabled)",
          "informative": "var(--ds-color-fg-informative)",
          "informative-contrast": "var(--ds-color-fg-informative-contrast)",
          "magic": "var(--ds-color-fg-magic)",
          "magic-contrast": "var(--ds-color-fg-magic-contrast)",
          "neutral": "var(--ds-color-fg-neutral)",
          "neutral-inverted": "var(--ds-color-fg-neutral-inverted)",
          "neutral-muted": "var(--ds-color-fg-neutral-muted)",
          "neutral-subtle": "var(--ds-color-fg-neutral-subtle)",
          "on-brand-solid": "var(--ds-color-fg-on-brand-solid)",
          "on-critical-solid": "var(--ds-color-fg-on-critical-solid)",
          "on-informative-solid": "var(--ds-color-fg-on-informative-solid)",
          "on-magic-solid": "var(--ds-color-fg-on-magic-solid)",
          "on-neutral-solid": "var(--ds-color-fg-on-neutral-solid)",
          "on-positive-solid": "var(--ds-color-fg-on-positive-solid)",
          "on-warning-solid": "var(--ds-color-fg-on-warning-solid)",
          "placeholder": "var(--ds-color-fg-placeholder)",
          "positive": "var(--ds-color-fg-positive)",
          "positive-contrast": "var(--ds-color-fg-positive-contrast)",
          "warning": "var(--ds-color-fg-warning)",
          "warning-contrast": "var(--ds-color-fg-warning-contrast)"
        },
        "stroke": {
          "brand-solid": "var(--ds-color-stroke-brand-solid)",
          "brand-weak": "var(--ds-color-stroke-brand-weak)",
          "critical-solid": "var(--ds-color-stroke-critical-solid)",
          "critical-weak": "var(--ds-color-stroke-critical-weak)",
          "focus-ring": "var(--ds-color-stroke-focus-ring)",
          "informative-solid": "var(--ds-color-stroke-informative-solid)",
          "informative-weak": "var(--ds-color-stroke-informative-weak)",
          "magic-solid": "var(--ds-color-stroke-magic-solid)",
          "magic-weak": "var(--ds-color-stroke-magic-weak)",
          "neutral": "var(--ds-color-stroke-neutral)",
          "neutral-contrast": "var(--ds-color-stroke-neutral-contrast)",
          "neutral-muted": "var(--ds-color-stroke-neutral-muted)",
          "neutral-solid": "var(--ds-color-stroke-neutral-solid)",
          "neutral-subtle": "var(--ds-color-stroke-neutral-subtle)",
          "neutral-weak": "var(--ds-color-stroke-neutral-weak)",
          "positive-solid": "var(--ds-color-stroke-positive-solid)",
          "positive-weak": "var(--ds-color-stroke-positive-weak)",
          "warning-solid": "var(--ds-color-stroke-warning-solid)",
          "warning-weak": "var(--ds-color-stroke-warning-weak)"
        },
        "chart": {
          "series-1": "var(--ds-color-chart-series-1)",
          "series-2": "var(--ds-color-chart-series-2)",
          "series-3": "var(--ds-color-chart-series-3)",
          "series-4": "var(--ds-color-chart-series-4)",
          "series-5": "var(--ds-color-chart-series-5)"
        }
      },
      "spacing": {
        "x0": "var(--ds-space-x0)",
        "x0_5": "var(--ds-space-x0_5)",
        "x1": "var(--ds-space-x1)",
        "x1_5": "var(--ds-space-x1_5)",
        "x2": "var(--ds-space-x2)",
        "x2_5": "var(--ds-space-x2_5)",
        "x3": "var(--ds-space-x3)",
        "x3_5": "var(--ds-space-x3_5)",
        "x4": "var(--ds-space-x4)",
        "x4_5": "var(--ds-space-x4_5)",
        "x5": "var(--ds-space-x5)",
        "x6": "var(--ds-space-x6)",
        "x7": "var(--ds-space-x7)",
        "x8": "var(--ds-space-x8)",
        "x9": "var(--ds-space-x9)",
        "x10": "var(--ds-space-x10)",
        "x11": "var(--ds-space-x11)",
        "x12": "var(--ds-space-x12)",
        "x13": "var(--ds-space-x13)",
        "x14": "var(--ds-space-x14)",
        "x15": "var(--ds-space-x15)",
        "x16": "var(--ds-space-x16)",
        "x18": "var(--ds-space-x18)",
        "x20": "var(--ds-space-x20)",
        "x24": "var(--ds-space-x24)",
        "x32": "var(--ds-space-x32)"
      },
      "borderRadius": {
        "r0": "var(--ds-radius-r0)",
        "r0_5": "var(--ds-radius-r0_5)",
        "r1": "var(--ds-radius-r1)",
        "r1_5": "var(--ds-radius-r1_5)",
        "r2": "var(--ds-radius-r2)",
        "r2_5": "var(--ds-radius-r2_5)",
        "r3": "var(--ds-radius-r3)",
        "r3_5": "var(--ds-radius-r3_5)",
        "r4": "var(--ds-radius-r4)",
        "r5": "var(--ds-radius-r5)",
        "r6": "var(--ds-radius-r6)",
        "r8": "var(--ds-radius-r8)",
        "full": "var(--ds-radius-full)",
        "shape-2xs": "var(--ds-shape-2xs)",
        "shape-xs": "var(--ds-shape-xs)",
        "shape-sm": "var(--ds-shape-sm)",
        "shape-md": "var(--ds-shape-md)",
        "shape-lg": "var(--ds-shape-lg)",
        "shape-xl": "var(--ds-shape-xl)",
        "shape-2xl": "var(--ds-shape-2xl)",
        "shape-3xl": "var(--ds-shape-3xl)",
        "shape-pill": "var(--ds-shape-pill)"
      },
      "fontSize": {
        "t01": [
          "var(--ds-font-size-t01)",
          {
            "lineHeight": "var(--ds-line-height-t01)"
          }
        ],
        "t02": [
          "var(--ds-font-size-t02)",
          {
            "lineHeight": "var(--ds-line-height-t02)"
          }
        ],
        "t03": [
          "var(--ds-font-size-t03)",
          {
            "lineHeight": "var(--ds-line-height-t03)"
          }
        ],
        "t04": [
          "var(--ds-font-size-t04)",
          {
            "lineHeight": "var(--ds-line-height-t04)"
          }
        ],
        "t05": [
          "var(--ds-font-size-t05)",
          {
            "lineHeight": "var(--ds-line-height-t05)"
          }
        ],
        "t06": [
          "var(--ds-font-size-t06)",
          {
            "lineHeight": "var(--ds-line-height-t06)"
          }
        ],
        "t07": [
          "var(--ds-font-size-t07)",
          {
            "lineHeight": "var(--ds-line-height-t07)"
          }
        ],
        "t08": [
          "var(--ds-font-size-t08)",
          {
            "lineHeight": "var(--ds-line-height-t08)"
          }
        ],
        "t09": [
          "var(--ds-font-size-t09)",
          {
            "lineHeight": "var(--ds-line-height-t09)"
          }
        ],
        "t10": [
          "var(--ds-font-size-t10)",
          {
            "lineHeight": "var(--ds-line-height-t10)"
          }
        ],
        "t11": [
          "var(--ds-font-size-t11)",
          {
            "lineHeight": "var(--ds-line-height-t11)"
          }
        ],
        "t12": [
          "var(--ds-font-size-t12)",
          {
            "lineHeight": "var(--ds-line-height-t12)"
          }
        ],
        "t13": [
          "var(--ds-font-size-t13)",
          {
            "lineHeight": "var(--ds-line-height-t13)"
          }
        ],
        "t14": [
          "var(--ds-font-size-t14)",
          {
            "lineHeight": "var(--ds-line-height-t14)"
          }
        ],
        "t15": [
          "var(--ds-font-size-t15)",
          {
            "lineHeight": "var(--ds-line-height-t15)"
          }
        ],
        "t16": [
          "var(--ds-font-size-t16)",
          {
            "lineHeight": "var(--ds-line-height-t16)"
          }
        ],
        "t17": [
          "var(--ds-font-size-t17)",
          {
            "lineHeight": "var(--ds-line-height-t17)"
          }
        ]
      },
      "boxShadow": {
        "1": "var(--ds-elevation-1)",
        "2": "var(--ds-elevation-2)",
        "3": "var(--ds-elevation-3)",
        "4": "var(--ds-elevation-4)",
        "5": "var(--ds-elevation-5)",
        "raised": "var(--ds-elevation-raised)",
        "overlay": "var(--ds-elevation-overlay)",
        "panel": "var(--ds-elevation-panel)",
        "floating": "var(--ds-elevation-floating)",
        "modal": "var(--ds-elevation-modal)"
      },
      "fontFamily": {
        "sans": [
          "var(--ds-font-family-base)"
        ]
      },
      "fontWeight": {
        "regular": "var(--ds-font-weight-regular)",
        "medium": "var(--ds-font-weight-medium)",
        "semibold": "var(--ds-font-weight-semibold)",
        "bold": "var(--ds-font-weight-bold)"
      },
      "transitionDuration": {
        "fast": "var(--ds-duration-fast)",
        "normal": "var(--ds-duration-normal)",
        "slow": "var(--ds-duration-slow)"
      },
      "transitionTimingFunction": {
        "standard": "var(--ds-easing-standard)",
        "emphasized": "var(--ds-easing-emphasized)",
        "enter": "var(--ds-easing-enter)",
        "exit": "var(--ds-easing-exit)"
      },
      "zIndex": {
        "base": "var(--ds-z-base)",
        "sticky": "var(--ds-z-sticky)",
        "overlay": "var(--ds-z-overlay)",
        "dialog": "var(--ds-z-dialog)",
        "toast": "var(--ds-z-toast)",
        "tooltip": "var(--ds-z-tooltip)"
      }
    },
    "screens": {
      "sm": "480px",
      "md": "768px",
      "lg": "1280px",
      "xl": "1440px"
    }
  },
  "darkMode": [
    "selector",
    "[data-theme=\"dark\"]"
  ]
};
