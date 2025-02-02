import { renderHook } from '@testing-library/react';
import { useThemeColor } from './useThemeColor';
import { Colors } from "@/constants/Colors"; // Ensure this is the correct path for the Colors module
import * as useColorSchemeHook from "@/hooks/useColorScheme"; // Ensure this path is correct

// Mock useColorScheme to control the theme (light or dark)
jest.mock('@/hooks/useColorScheme');

describe('useThemeColor', () => {
  it('should return the light color from props when theme is light', () => {
    const mockUseColorScheme = jest.spyOn(useColorSchemeHook, 'useColorScheme');
    mockUseColorScheme.mockReturnValue('light'); // Mock light theme

    const props = { light: 'lightColor' };
    const colorName = 'text'; // Use a valid color key

    const { result } = renderHook(() => useThemeColor(props, colorName));

    expect(result.current).toBe('lightColor');
  });

  it('should return the dark color from props when theme is dark', () => {
    const mockUseColorScheme = jest.spyOn(useColorSchemeHook, 'useColorScheme');
    mockUseColorScheme.mockReturnValue('dark'); // Mock dark theme

    const props = { dark: 'darkColor' };
    const colorName = 'text';

    const { result } = renderHook(() => useThemeColor(props, colorName));

    expect(result.current).toBe('darkColor');
  });

  it('should fall back to Colors.light when theme is light and no light prop is provided', () => {
    const mockUseColorScheme = jest.spyOn(useColorSchemeHook, 'useColorScheme');
    mockUseColorScheme.mockReturnValue('light'); // Mock light theme

    const props = {};
    const colorName = 'text';

    const { result } = renderHook(() => useThemeColor(props, colorName));

    expect(result.current).toBe(Colors.light.text); // Assuming Colors.light.text exists
  });

  it('should fall back to Colors.dark when theme is dark and no dark prop is provided', () => {
    const mockUseColorScheme = jest.spyOn(useColorSchemeHook, 'useColorScheme');
    mockUseColorScheme.mockReturnValue('dark'); // Mock dark theme

    const props = {};
    const colorName = 'text';

    const { result } = renderHook(() => useThemeColor(props, colorName));

    expect(result.current).toBe(Colors.dark.text); // Assuming Colors.dark.text exists
  });

  it('should return light color by default if theme is undefined', () => {
    const mockUseColorScheme = jest.spyOn(useColorSchemeHook, 'useColorScheme');
    mockUseColorScheme.mockReturnValue(undefined); // No theme specified

    const props = { light: 'lightColor' };
    const colorName = 'text';

    const { result } = renderHook(() => useThemeColor(props, colorName));

    expect(result.current).toBe('lightColor');
  });
});
