import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  });
  const [tempData, setTempData] = useState({ ...profileData });
  const [errors, setErrors] = useState({});

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempData({ ...profileData });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!tempData?.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!tempData?.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!tempData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(tempData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!tempData?.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfileData({ ...tempData });
      setIsEditing(false);
      setErrors({});
    }
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleProfilePictureChange = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTempData(prev => ({
          ...prev,
          profilePicture: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal information and profile picture
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            iconName="Edit2"
            iconPosition="left"
            iconSize={16}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
              <Image
                src={isEditing ? tempData?.profilePicture : profileData?.profilePicture}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-smooth">
                <Icon name="Camera" size={16} color="white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
          <div>
            <h4 className="font-medium text-foreground">
              {profileData?.firstName} {profileData?.lastName}
            </h4>
            <p className="text-sm text-muted-foreground">{profileData?.email}</p>
            {isEditing && (
              <p className="text-xs text-muted-foreground mt-1">
                Click the camera icon to change your profile picture
              </p>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={isEditing ? tempData?.firstName : profileData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.firstName}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={isEditing ? tempData?.lastName : profileData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          value={isEditing ? tempData?.email : profileData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          disabled={!isEditing}
          error={errors?.email}
          description="This email will be used for account notifications"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          value={isEditing ? tempData?.phone : profileData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          disabled={!isEditing}
          error={errors?.phone}
          description="Used for security verification and important alerts"
          required
        />

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;