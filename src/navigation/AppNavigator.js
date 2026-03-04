import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, Compass } from 'lucide-react-native';

import DashboardScreen from '../screens/DashboardScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityDetailScreen from '../screens/ActivityDetailScreen';
import ArticleDetailScreen from '../screens/ArticleDetailScreen';
import { THEME } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: THEME.colors.primary,
                tabBarInactiveTintColor: THEME.colors.textLight,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: THEME.colors.surface,
                    borderTopColor: THEME.colors.border,
                    elevation: 10,
                    shadowOpacity: 0.1,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Discover"
                component={DiscoverScreen}
                options={{
                    tabBarLabel: 'Keşfet',
                    tabBarIcon: ({ color, size }) => <Compass color={color} size={size} />,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Hedefler',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: THEME.colors.background },
                }}
            >
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen
                    name="ActivityDetail"
                    component={ActivityDetailScreen}
                    options={{
                        headerShown: true,
                        headerTitle: 'Aktivite Detayları',
                        headerBackTitle: 'Geri',
                        headerTintColor: THEME.colors.text,
                        headerStyle: { backgroundColor: THEME.colors.surface },
                    }}
                />
                <Stack.Screen
                    name="ArticleDetail"
                    component={ArticleDetailScreen}
                    options={{
                        headerShown: false,
                        // The detail screen handles its own image header and back button.
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
