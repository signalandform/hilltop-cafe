import type { Metadata } from "next";
import { saveSiteSettings } from "@/lib/cms/actions";
import { getCmsContent } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Site Settings",
};

export default async function AdminSettingsPage() {
  const { settings } = await getCmsContent({ includeDrafts: true });

  return (
    <section className="admin-panel">
      <div className="admin-page-head">
        <p className="eyebrow">CMS</p>
        <h1>Site Settings</h1>
        <p>Edit the home page copy, visit details, and order link.</p>
      </div>

      <form className="admin-form-grid" action={saveSiteSettings}>
        <label>
          Brand name
          <input name="brandName" defaultValue={settings.brandName} required />
        </label>
        <label>
          Tagline
          <input name="tagline" defaultValue={settings.tagline} required />
        </label>
        <label>
          Hero eyebrow
          <input name="heroEyebrow" defaultValue={settings.heroEyebrow} required />
        </label>
        <label>
          Hero title
          <textarea name="heroTitle" defaultValue={settings.heroTitle} required />
        </label>
        <label className="admin-full">
          Hero body
          <textarea name="heroBody" defaultValue={settings.heroBody} required />
        </label>
        <label>
          Story title
          <input name="storyTitle" defaultValue={settings.storyTitle} required />
        </label>
        <label>
          Story quote
          <input name="storyQuote" defaultValue={settings.storyQuote} required />
        </label>
        <label className="admin-full">
          Story body, one paragraph per line
          <textarea name="storyBody" defaultValue={settings.storyBody.join("\n")} rows={5} required />
        </label>
        <label>
          Address
          <input name="address" defaultValue={settings.address} required />
        </label>
        <label>
          Hours
          <input name="hours" defaultValue={settings.hours} required />
        </label>
        <label>
          Phone
          <input name="phone" defaultValue={settings.phone} required />
        </label>
        <label>
          Order URL
          <input name="orderUrl" type="url" defaultValue={settings.orderUrl} required />
        </label>
        <label>
          Contact eyebrow
          <input name="contactEyebrow" defaultValue={settings.contactEyebrow} required />
        </label>
        <label>
          Contact title
          <input name="contactTitle" defaultValue={settings.contactTitle} required />
        </label>
        <label className="admin-full">
          Contact body
          <textarea name="contactBody" defaultValue={settings.contactBody} required />
        </label>
        <div className="admin-actions admin-full">
          <button className="btn" type="submit">
            Save Settings
          </button>
        </div>
      </form>
    </section>
  );
}
