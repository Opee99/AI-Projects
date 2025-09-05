import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationsSection = () => {
  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      id: 1,
      name: "Chase Bank",
      type: "bank",
      accountNumber: "****1234",
      status: "connected",
      lastSync: "2 hours ago",
      balance: "$12,450.00",
      icon: "Building2"
    },
    {
      id: 2,
      name: "American Express",
      type: "credit",
      accountNumber: "****5678",
      status: "connected",
      lastSync: "1 hour ago",
      balance: "-$2,340.00",
      icon: "CreditCard"
    },
    {
      id: 3,
      name: "Wells Fargo Savings",
      type: "savings",
      accountNumber: "****9012",
      status: "error",
      lastSync: "Failed",
      balance: "$8,750.00",
      icon: "PiggyBank"
    }
  ]);

  const [thirdPartyIntegrations, setThirdPartyIntegrations] = useState([
    {
      id: 1,
      name: "PayPal",
      description: "Sync PayPal transactions and balance",
      status: "connected",
      permissions: ["Read transactions", "View balance"],
      icon: "Wallet",
      color: "var(--color-primary)"
    },
    {
      id: 2,
      name: "Venmo",
      description: "Import Venmo payment history",
      status: "disconnected",
      permissions: ["Read transactions", "View contacts"],
      icon: "Users",
      color: "var(--color-accent)"
    },
    {
      id: 3,
      name: "Mint",
      description: "Import existing financial data from Mint",
      status: "connected",
      permissions: ["Read all financial data", "Import categories"],
      icon: "TrendingUp",
      color: "var(--color-success)"
    },
    {
      id: 4,
      name: "Robinhood",
      description: "Track investment portfolio and trades",
      status: "disconnected",
      permissions: ["Read portfolio", "View trade history"],
      icon: "BarChart3",
      color: "var(--color-warning)"
    }
  ]);

  const handleRefreshAccount = (accountId) => {
    setConnectedAccounts(prev => 
      prev?.map(account => 
        account?.id === accountId 
          ? { ...account, lastSync: "Syncing...", status: "syncing" }
          : account
      )
    );

    // Simulate sync completion
    setTimeout(() => {
      setConnectedAccounts(prev => 
        prev?.map(account => 
          account?.id === accountId 
            ? { ...account, lastSync: "Just now", status: "connected" }
            : account
        )
      );
    }, 2000);
  };

  const handleDisconnectAccount = (accountId) => {
    setConnectedAccounts(prev => 
      prev?.filter(account => account?.id !== accountId)
    );
  };

  const handleToggleIntegration = (integrationId) => {
    setThirdPartyIntegrations(prev =>
      prev?.map(integration =>
        integration?.id === integrationId
          ? { 
              ...integration, 
              status: integration?.status === 'connected' ? 'disconnected' : 'connected' 
            }
          : integration
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-destructive)';
      case 'syncing':
        return 'var(--color-warning)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Error';
      case 'syncing':
        return 'Syncing...';
      default:
        return 'Disconnected';
    }
  };

  return (
    <div className="space-y-6">
      {/* Financial Institution Connections */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Financial Institution Connections</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your connected bank accounts and credit cards
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Account
          </Button>
        </div>

        <div className="space-y-4">
          {connectedAccounts?.map((account) => (
            <div key={account?.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={account?.icon} size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{account?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {account?.accountNumber} • {account?.balance}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center space-x-1">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getStatusColor(account?.status) }}
                        />
                        <span 
                          className="text-xs font-medium"
                          style={{ color: getStatusColor(account?.status) }}
                        >
                          {getStatusText(account?.status)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        • Last sync: {account?.lastSync}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRefreshAccount(account?.id)}
                    disabled={account?.status === 'syncing'}
                    iconName="RefreshCw"
                    iconSize={16}
                  >
                    {account?.status === 'syncing' ? 'Syncing...' : 'Refresh'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnectAccount(account?.id)}
                    iconName="Unlink"
                    iconSize={16}
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Third-Party Integrations */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">Third-Party Integrations</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connect with external financial services and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {thirdPartyIntegrations?.map((integration) => (
            <div key={integration?.id} className="p-4 bg-muted rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon name={integration?.icon} size={20} color={integration?.color} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{integration?.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ 
                          backgroundColor: integration?.status === 'connected' ?'var(--color-success)' :'var(--color-muted-foreground)' 
                        }}
                      />
                      <span 
                        className="text-xs font-medium"
                        style={{ 
                          color: integration?.status === 'connected' ?'var(--color-success)' :'var(--color-muted-foreground)' 
                        }}
                      >
                        {integration?.status === 'connected' ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant={integration?.status === 'connected' ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleIntegration(integration?.id)}
                >
                  {integration?.status === 'connected' ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {integration?.description}
              </p>
              
              {integration?.status === 'connected' && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-foreground">Permissions:</p>
                  <div className="space-y-1">
                    {integration?.permissions?.map((permission, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={12} color="var(--color-success)" />
                        <span className="text-xs text-muted-foreground">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* API Settings */}
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">API Access</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage API keys and external integrations
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">Personal API Key</h4>
                <p className="text-sm text-muted-foreground">
                  Use this key to access your financial data programmatically
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Copy"
                iconSize={16}
              >
                Copy Key
              </Button>
            </div>
            <div className="bg-background p-3 rounded border font-mono text-sm">
              fp_live_sk_1234567890abcdef...
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-foreground">Webhook Endpoints</h4>
                <p className="text-sm text-muted-foreground">
                  Configure endpoints to receive real-time financial updates
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconSize={16}
              >
                Configure
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              No webhook endpoints configured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;