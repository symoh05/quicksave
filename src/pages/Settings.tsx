import React from 'react';
import { Moon, Sun, Monitor, Folder, Info, Shield, Smartphone } from 'lucide-react';
import Header from '@/components/UI/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { useStatus } from '@/contexts/StatusContext';

const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { savedStatuses } = useStatus();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Light mode' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Dark mode' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Follow system setting' },
  ];

  const formatStorageUsed = () => {
    const totalSize = savedStatuses.reduce((acc, status) => acc + status.size, 0);
    const mb = (totalSize / (1024 * 1024)).toFixed(1);
    return `${mb} MB`;
  };

  const appInfo = {
    version: '1.0.0',
    buildNumber: '1',
    lastUpdated: new Date().toLocaleDateString(),
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        title="Settings"
        subtitle="Customize your experience"
      />
      
      <div className="p-4 space-y-6 pb-20">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sun size={20} />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>
              Choose your preferred theme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={(value: any) => setTheme(value)}>
              {themeOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex items-center space-x-3 cursor-pointer flex-1">
                      <IconComponent size={18} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Storage Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Folder size={20} />
              <span>Storage</span>
            </CardTitle>
            <CardDescription>
              Manage your saved statuses
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div>
                <div className="font-medium">Saved Statuses</div>
                <div className="text-sm text-muted-foreground">{savedStatuses.length} files</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{formatStorageUsed()}</div>
                <div className="text-sm text-muted-foreground">Used</div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => window.location.hash = '#saved'}
            >
              <Folder size={16} className="mr-2" />
              Manage Saved Files
            </Button>
          </CardContent>
        </Card>

        {/* Privacy & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield size={20} />
              <span>Privacy & Permissions</span>
            </CardTitle>
            <CardDescription>
              App permissions and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">Storage Access</div>
                  <div className="text-sm text-muted-foreground">Required to save statuses</div>
                </div>
                <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  Granted
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <div className="font-medium">Media Access</div>
                  <div className="text-sm text-muted-foreground">Access to WhatsApp media folder</div>
                </div>
                <div className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                  Granted
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info size={20} />
              <span>About QuickSave</span>
            </CardTitle>
            <CardDescription>
              App information and version details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{appInfo.version}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Build Number</span>
                <span className="font-medium">{appInfo.buildNumber}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">{appInfo.lastUpdated}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                QuickSave is a WhatsApp Status Saver app that helps you save and manage your favorite statuses offline.
              </p>
              
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Smartphone size={14} />
                <span>Built with React & Lovable</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4">
          <p>Made with ❤️ using Lovable</p>
          <p className="mt-1">© 2024 QuickSave. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;