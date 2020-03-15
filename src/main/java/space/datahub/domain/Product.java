package space.datahub.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.ToString;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
@ToString(of = {"id", "name"})
public class Product{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @ManyToOne
    private Mission mission;

    @NotNull
    private int price;

    @NotNull
    private String url;

    @Column(updatable = false)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @Column(nullable = false)
    private double footprint_xx;

    @Column(nullable = false)
    private double footprint_xy;

    @Column(nullable = false)
    private double footprint_yy;

    @Column(nullable = false)
    private double footprint_yx;

    // field for check if user can see his URL
    @Column
    private boolean ordered;

    public boolean isOrdered() {
        return ordered;
    }

    public void setOrdered(boolean ordered) {
        this.ordered = ordered;
    }

    public double getFootprint_xy() {
        return footprint_xy;
    }

    public void setFootprint_xy(double footprint_xy) {
        this.footprint_xy = footprint_xy;
    }

    public double getFootprint_yy() {
        return footprint_yy;
    }

    public void setFootprint_yy(double footprint_yy) {
        this.footprint_yy = footprint_yy;
    }

    public double getFootprint_yx() {
        return footprint_yx;
    }

    public void setFootprint_yx(double footprint_yx) {
        this.footprint_yx = footprint_yx;
    }

    public double getFootprint_xx() {
        return footprint_xx;
    }

    public void setFootprint_xx(double footprint_xx) {
        this.footprint_xx = footprint_xx;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getUrl() {
        // Here we are checking if user is an admin. If true, he can see URL's of products.
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = "";
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
             username = principal.toString();
        }

        // If product was ordered or username is admin we can show URL of product, if no, we will send value "hidden".
        return ordered || username.equals("admin") ? url : "hidden";
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
