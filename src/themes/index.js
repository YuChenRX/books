import { reactive } from "vue";

export const  ThemesConfig = reactive({
    themes: {
        // 亮色主题 - 默认白色基调
        light: {
            dark: false,
            colors: {
                // 品牌色
                primary: "#5865F2",       // 主按钮/重要元素
                secondary: "#404EED",     // 次要按钮/辅助元素

                // 状态色
                error: "#EF4444",         // 错误提示
                success: "#10B981",       // 成功提示
                warning: "#F59E0B",       // 警告提示

                // 背景色
                background: "#FFFFFF",    // 页面背景
                surface: "#F8FAFC",       // 卡片/组件背景

                // 文本色
                text: "#FFFFFF",          // 默认文字（深灰色）
                onPrimary: "#FFFFFF",     // 主色上的文字
                onSecondary: "#FFFFFF",   // 辅色上的文字
                onBackground: "#1E293B",  // 页面背景上的文字
                onSurface: "#334155",     // 组件背景上的文字

                // 中性色
                outline: "#E2E8F0",       // 边框/分割线
                shadow: "#64748B33"       // 阴影（带透明度）
            }
        },

        // 暗色主题 - 深色基调
        dark: {
            dark: true,
            colors: {
                primary: "#5865F2",
                secondary: "#404EED",
                error: "#EF4444",
                success: "#10B981",
                warning: "#F59E0B",

                // 深色背景
                background: "#1E293B",     // 深蓝灰背景
                surface: "#334155",        // 组件深灰色

                // 浅色文本
                text: "#FFFFFF",           // 默认文字（浅灰色）
                onPrimary: "#FFFFFF",
                onSecondary: "#FFFFFF",
                onBackground: "#F8FAFC",   // 深背景上的浅文字
                onSurface: "#F8FAFC",      // 深组件上的浅文字

                outline: "#475569",        // 深色边框
                shadow: "#1E293B66"        // 深色阴影
            }
        },

        // 蓝色主题 - 品牌色强化
        blue: {
            dark: false,
            colors: {
                // 强化蓝色系
                primary: "#3B82F6",        // 更亮的蓝色
                secondary: "#2563EB",      // 深蓝色

                error: "#EF4444",
                success: "#10B981",
                warning: "#F59E0B",

                // 浅蓝色背景
                background: "#EFF6FF",     // 淡蓝色背景
                surface: "#DBEAFE",        // 浅蓝色组件背景

                // 深蓝色文本
                text: "#FFFFFF",
                onPrimary: "#FFFFFF",
                onSecondary: "#FFFFFF",
                onBackground: "#1E3A8A",   // 淡蓝背景上的深蓝文字
                onSurface: "#1E3A8A",      // 浅蓝组件上的深蓝文字

                outline: "#BFDBFE",        // 浅蓝色边框
                shadow: "#3B82F633"        // 蓝色调阴影
            }
        }
    }
});