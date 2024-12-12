import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ProgramFormPreview = () => {
  // Previous state and handlers remain the same until generateRemainingPaymentsText
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    programLength: "16",
    initialPaymentAmount: "5400",
    initialPaymentCount: "1",
    subsequentPaymentAmount: "300",
    subsequentPaymentCount: "0",
    bonusWeeks: false,
    upgradeOption: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const hasSubsequentPayments = parseInt(formData.subsequentPaymentCount) > 0 && 
                               parseInt(formData.subsequentPaymentAmount) > 0;

  const generateRemainingPaymentsText = () => {
    if (hasSubsequentPayments) {
      return `${formData.subsequentPaymentCount} payment${parseInt(formData.subsequentPaymentCount) > 1 ? 's' : ''} of $${formData.subsequentPaymentAmount}`;
    }
    return '';
  };

  const generateBonusWeeksText = () => {
    if (formData.bonusWeeks) {
      const baseWeeks = parseInt(formData.programLength);
      const totalWeeks = baseWeeks + 4;
      return `Program includes ${baseWeeks} weeks plus 4 bonus weeks, for a total of ${totalWeeks} weeks.`;
    }
    return '';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Client Information Card stays the same */}
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Client Name</Label>
              <Input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleInputChange}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleInputChange}
                placeholder="(555) 555-5555"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                type="text"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="123 Main St, City, State 12345"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Program Details Card stays the same */}
      <Card>
        <CardHeader>
          <CardTitle>Program Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Program Length</Label>
              <RadioGroup
                defaultValue="16"
                onValueChange={(value) => handleInputChange({
                  target: { name: 'programLength', value }
                })}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="16" id="16weeks" />
                  <Label htmlFor="16weeks">16 Weeks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="52" id="52weeks" />
                  <Label htmlFor="52weeks">52 Weeks</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Initial Payment</Label>
                <Input
                  type="text"
                  name="initialPaymentAmount"
                  value={formData.initialPaymentAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Initial Payment Count</Label>
                <Input
                  type="text"
                  name="initialPaymentCount"
                  value={formData.initialPaymentCount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Subsequent Payment</Label>
                <Input
                  type="text"
                  name="subsequentPaymentAmount"
                  value={formData.subsequentPaymentAmount}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Subsequent Payment Count</Label>
                <Input
                  type="text"
                  name="subsequentPaymentCount"
                  value={formData.subsequentPaymentCount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Bonus Weeks</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.bonusWeeks}
                    onCheckedChange={() => handleSwitchChange('bonusWeeks')}
                  />
                  <span>{formData.bonusWeeks ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Upgrade Option</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.upgradeOption}
                    onCheckedChange={() => handleSwitchChange('upgradeOption')}
                  />
                  <span>{formData.upgradeOption ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card with updated bonus weeks logic */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-lg">
            <div className="space-y-2">
              <p><strong>Client Information:</strong></p>
              <p>Name: {formData.clientName}</p>
              <p>Email: {formData.clientEmail}</p>
              <p>Phone: {formData.clientPhone}</p>
              <p>Address: {formData.clientAddress}</p>
            </div>
            <hr className="my-4" />
            <p><strong>Length of Program:</strong> {formData.programLength} weeks</p>
            <p><strong>Payment Received:</strong> ${formData.initialPaymentAmount}</p>
            {hasSubsequentPayments && (
              <p><strong>Remaining Payments:</strong> {generateRemainingPaymentsText()}</p>
            )}
            {formData.bonusWeeks && (
              <p><strong>Bonus Weeks:</strong> {generateBonusWeeksText()}</p>
            )}
            {formData.upgradeOption && formData.programLength === "16" && (
              <p><strong>Upgrade Option:</strong> Client can upgrade to a full-year (52-week) program at a discounted rate of $5,400 total. This option is available within the first 30 days of the initial enrollment in the 16-week program.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgramFormPreview;

